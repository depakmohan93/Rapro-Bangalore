export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    name = '',
    phone = '',
    email = '',
    service = '',
    propertyType = '',
    location = '',
    message = '',
    timestamp = '',
  } = req.body || {}

  try {
    // Step 1: Exchange refresh token for a fresh Zoho access token
    const tokenRes = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token',
      }),
    })

    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      console.error('Zoho token error:', JSON.stringify(tokenData))
      // Return success so the user is never blocked by a token failure
      return res.status(200).json({ success: true })
    }

    // Step 2: Build the Zoho Bigin contact record
    const nameParts = name.trim().split(/\s+/)
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : ''
    const lastName =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] || 'Unknown'

    const descriptionParts = [
      timestamp && `Submitted: ${timestamp}`,
      service && `Service: ${service}`,
      propertyType && `Property Type: ${propertyType}`,
      location && `Location: ${location}`,
      message && `Message: ${message}`,
    ].filter(Boolean)

    const contactPayload = {
      data: [
        {
          First_Name: firstName,
          Last_Name: lastName,
          Phone: phone,
          Email: email,
          Description: descriptionParts.join('\n'),
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
      return res.status(200).json({ success: true })
    }

    // Log the Bigin error but still return success — never block the user
    console.error('Zoho Bigin error:', JSON.stringify(biginData))
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('submit-lead error:', err.message)
    // Always return success — a CRM failure must never break the user flow
    return res.status(200).json({ success: true })
  }
}
