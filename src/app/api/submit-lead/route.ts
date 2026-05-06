import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name = '',
      phone = '',
      email = '',
      service = '',
      propertyType = '',
      plotSize = '',
      location = '',
      message = '',
      timestamp = '',
    } = body

    // Step 1: Exchange refresh token for a fresh Zoho access token
    const tokenRes = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: process.env.ZOHO_REFRESH_TOKEN ?? '',
        client_id: process.env.ZOHO_CLIENT_ID ?? '',
        client_secret: process.env.ZOHO_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
      }),
    })

    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      console.error('Zoho token error:', JSON.stringify(tokenData))
      // Return success so the user is never blocked by a token failure
      return NextResponse.json({ success: true })
    }

    // Step 2: Build the Zoho Bigin contact record
    const metaParts = [
      timestamp && `Submitted: ${timestamp}`,
      propertyType && `Property Type: ${propertyType}`,
      location && `Location: ${location}`,
    ].filter(Boolean)

    const contactPayload = {
      data: [
        {
          Last_Name: (name as string).trim() || 'Unknown',
          Email: email,
          Phone: phone,
          Services_you_are_looking_for: service,
          Message: message,
          Preferred_plot_size: plotSize,
          Description: metaParts.join('\n'),
          Lead_Source: 'Website',
          $properties_for_module: 'Contacts',
        },
      ],
    }

    // Step 3: POST the new contact to Zoho Bigin
    const biginRes = await fetch('https://www.zohoapis.in/bigin/v2/Contacts', {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    })

    const biginData = await biginRes.json()

    if (biginData.data?.[0]?.status === 'success') {
      return NextResponse.json({ success: true })
    }

    // Log the Bigin error but still return success — never block the user
    console.error('Zoho Bigin error:', JSON.stringify(biginData))
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('submit-lead error:', message)
    // Always return success — a CRM failure must never break the user flow
    return NextResponse.json({ success: true })
  }
}
