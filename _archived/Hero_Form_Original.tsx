// Archived on: 2026-05-21
// Original form from Hero.tsx — restore by copying back into Hero.tsx

<form id="consultation-form" onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl px-10 pb-10 pt-14" style={{ boxShadow: '0px 25px 42.7px -12px rgba(44,123,48,0.36)' }}>
  <h2 className="font-quicksand font-bold text-[#1A1C1E] text-2xl leading-8 mb-1">Get your free consultation today.</h2>
  <p className="font-poppins font-normal text-[#40493D] text-sm mb-8">Our experts will call you back within 24 hours.</p>
  <div className="flex flex-col gap-4">

    {/* Full Name */}
    <div>
      <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Full Name</label>
      <input type="text" placeholder="e.g. Anand Kumar" value={formData.name} onChange={e => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }) }} className={inputClass('name')} />
      {errors.name && <p className="font-poppins text-red-500 text-xs mt-1">{errors.name}</p>}
    </div>

    {/* Phone */}
    <div>
      <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Phone Number <span className="text-[#6B7280] font-normal">(WhatsApp preferred)</span></label>
      <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => { setFormData({ ...formData, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: '' }) }} className={inputClass('phone')} />
      {errors.phone && <p className="font-poppins text-red-500 text-xs mt-1">{errors.phone}</p>}
    </div>

    {/* Email */}
    <div>
      <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Email</label>
      <input type="email" placeholder="xyz@gmail.com" value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }) }} className={inputClass('email')} />
      {errors.email && <p className="font-poppins text-red-500 text-xs mt-1">{errors.email}</p>}
    </div>

    {/* Property Type dropdown */}
    <div>
      <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Property Type</label>
      <div className="relative">
        <select
          value={formData.propertyType}
          onChange={e => { setFormData({ ...formData, propertyType: e.target.value }); if (errors.propertyType) setErrors({ ...errors, propertyType: '' }) }}
          className={`w-full h-12 rounded-lg px-4 font-poppins text-base border-0 outline-none appearance-none transition-all ${errors.propertyType ? 'bg-[#F3F3F6] ring-2 ring-red-400' : 'bg-[#F3F3F6] focus:ring-2 focus:ring-[#73B130]/30'} ${formData.propertyType ? 'text-[#1A1C1E]' : 'text-[#6B7280]'}`}
        >
          <option value="">Select property type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
          <option value="Other">Other</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </div>
      </div>
      {errors.propertyType && <p className="font-poppins text-red-500 text-xs mt-1">{errors.propertyType}</p>}
    </div>

    {/* Property Location dropdown */}
    <div>
      <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Property Location</label>
      <div className="relative">
        <select
          value={formData.propertyLocation}
          onChange={e => { setFormData({ ...formData, propertyLocation: e.target.value, propertyLocationOther: '' }); if (errors.propertyLocation) setErrors({ ...errors, propertyLocation: '' }) }}
          className={`w-full h-12 rounded-lg px-4 font-poppins text-base border-0 outline-none appearance-none transition-all ${errors.propertyLocation ? 'bg-[#F3F3F6] ring-2 ring-red-400' : 'bg-[#F3F3F6] focus:ring-2 focus:ring-[#73B130]/30'} ${formData.propertyLocation ? 'text-[#1A1C1E]' : 'text-[#6B7280]'}`}
        >
          <option value="">Select a location</option>
          <option value="Whitefield">Whitefield</option>
          <option value="Koramangala">Koramangala</option>
          <option value="Indiranagar">Indiranagar</option>
          <option value="HSR Layout">HSR Layout</option>
          <option value="Marathahalli">Marathahalli</option>
          <option value="Electronic City">Electronic City</option>
          <option value="Sarjapur Road">Sarjapur Road</option>
          <option value="JP Nagar">JP Nagar</option>
          <option value="Jayanagar">Jayanagar</option>
          <option value="Hebbal">Hebbal</option>
          <option value="Yelahanka">Yelahanka</option>
          <option value="Bannerghatta Road">Bannerghatta Road</option>
          <option value="BTM Layout">BTM Layout</option>
          <option value="Bellandur">Bellandur</option>
          <option value="Other">Other</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </div>
      </div>
      {errors.propertyLocation && <p className="font-poppins text-red-500 text-xs mt-1">{errors.propertyLocation}</p>}
      {formData.propertyLocation === 'Other' && (
        <input
          type="text"
          placeholder="Please specify your location"
          value={formData.propertyLocationOther}
          onChange={e => setFormData({ ...formData, propertyLocationOther: e.target.value })}
          className="w-full h-[47px] bg-[#F3F3F6] rounded-lg px-4 font-poppins text-base text-[#1A1C1E] placeholder-[#6B7280] border-0 outline-none transition-all focus:ring-2 focus:ring-[#73B130]/30 mt-2"
        />
      )}
    </div>

    {/* Submit */}
    <button type="submit" disabled={submitting} className="w-full h-[60px] rounded-lg text-white font-poppins font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.01] mt-2 disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: '#73B130' }}>
      {submitting ? 'Submitting...' : 'Book Free Callback'}
    </button>

  </div>
</form>
