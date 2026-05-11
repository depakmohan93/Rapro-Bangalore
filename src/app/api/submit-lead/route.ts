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

    // ── Bigin ────────────────────────────────────────────────────────────────

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

    const metaParts = [
      timestamp && `Submitted: ${timestamp}`,
      propertyType && `Property Type: ${propertyType}`,
      location && `Location: ${location}`,
    ].filter(Boolean)

    // Only include picklist fields when they have a value — Bigin rejects empty strings on picklists
    const biginRecord: Record<string, unknown> = {
      Last_Name: (name as string).trim() || 'Unknown',
      Email: email,
      Phone: phone,
      Description: metaParts.join('\n'),
      Lead_Source: 'Website',
      $properties_for_module: 'Contacts',
    }
    if (service) biginRecord.Services_you_are_looking_for = service
    if (message) biginRecord.Message = message
    if (plotSize) biginRecord.Preferred_plot_size = plotSize

    const biginPayload = { data: [biginRecord] }

    // ── HubSpot ──────────────────────────────────────────────────────────────

    const nameParts = (name as string).trim().split(' ')
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : ''
    const lastName = nameParts[nameParts.length - 1] || 'Unknown'

    const hubspotProperties: Record<string, string> = {
      email,
      firstname: firstName,
      lastname: lastName,
      phone,
      hs_lead_status: 'NEW',
    }
    if (location) hubspotProperties.city = location
    if (service) hubspotProperties.services_you_are_looking_for = service
    if (message) hubspotProperties.message = message
    if (propertyType) hubspotProperties.property_type = propertyType
    if (plotSize) hubspotProperties.preferred_plot_size = plotSize

    // ── Fire both in parallel ─────────────────────────────────────────────────

    const [biginResult, hubspotResult] = await Promise.allSettled([
      // Bigin
      (async () => {
        if (!tokenData.access_token) {
          console.error('Zoho token error:', JSON.stringify(tokenData))
          return
        }
        const res = await fetch('https://www.zohoapis.in/bigin/v2/Contacts', {
          method: 'POST',
          headers: {
            Authorization: `Zoho-oauthtoken ${tokenData.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(biginPayload),
        })
        const data = await res.json()
        if (data.data?.[0]?.status !== 'success') {
          console.error('Zoho Bigin error:', JSON.stringify(data))
        }
      })(),

      // HubSpot
      (async () => {
        const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties: hubspotProperties }),
        })
        const data = await res.json()
        if (!res.ok) {
          console.error('HubSpot error:', JSON.stringify(data))
        }
      })(),
    ])

    if (biginResult.status === 'rejected') {
      console.error('Bigin call failed:', biginResult.reason)
    }
    if (hubspotResult.status === 'rejected') {
      console.error('HubSpot call failed:', hubspotResult.reason)
    }

    // Always return success — a CRM failure must never block the user
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('submit-lead error:', message)
    return NextResponse.json({ success: true })
  }
}
