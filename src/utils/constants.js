export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

export const mockDoctors = [
  {
    _id: "1",
    name: "Dr. Smith",
    specialty: "Cardiologist",
    phone: "555-0123",
    email: "drsmith@example.com"
  },
  {
    _id: "2", 
    name: "Dr. Johnson",
    specialty: "Primary Care",
    phone: "555-0124",
    email: "drjohnson@example.com"
  }
];

export const formFields = {
  personal: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      id: 'user-name',
      placeholder: 'Enter your full name',
      required: true
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'date',
      id: 'dob',
      placeholder: 'Enter your date of birth',
      required: true
    }
  ],
  address: [
    {
      name: 'streetAddress',
      label: 'Street Address',
      type: 'text',
      placeholder: 'Enter street address',
      required: true,
      className: 'full-width'
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter city',
      required: true
    },
    {
      name: 'state',
      label: 'State',
      type: 'select',
      options: US_STATES,
      defaultOption: 'Select state',
      required: true
    },
    {
      name: 'zipcode',
      label: 'Zip code',
      type: 'text',
      placeholder: 'Enter zipcode',
      pattern: '[0-9]{5}',
      maxLength: '5',
      required: true
    }
  ],
  demographics: [
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      id: 'gender',
      required: true,
      options: [
        { value: '', label: 'Select your gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'non-binary', label: 'Non-Binary' },
        { value: 'prefer-not-to-say', label: 'Prefer Not to Say' }
      ]
    }
  ],
  measurements: [
    {
      name: 'heightFeet',
      label: 'Height (ft)',
      type: 'select',
      required: true,
      options: Array.from({ length: 8 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1} ft`
      }))
    },
    {
      name: 'heightInches',
      label: 'Height (in)',
      type: 'select',
      required: true,
      options: Array.from({ length: 12 }, (_, i) => ({
        value: String(i),
        label: `${i} in`
      }))
    },
    {
      name: 'weightValue',
      label: 'Weight',
      type: 'select',
      required: true,
      options: Array.from({ length: 401 }, (_, i) => ({
        value: String(i + 20),
        label: String(i + 20)
      }))
    },
    {
      name: 'weightUnit',
      label: 'Unit',
      type: 'select',
      required: true,
      options: [
        { value: 'kg', label: 'kg' },
        { value: 'lbs', label: 'lbs' }
      ]
    }
  ],  medical: [
    {
      name: 'bloodType',
      label: 'Blood Type',
      type: 'select',
      id: 'bloodType',
      required: true,
      options: [
        { value: '', label: 'Select blood type' },
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' }
      ]
    },
    {
      name: 'allergies',
      label: 'Allergies',
      type: 'text',
      id: 'allergies',
      placeholder: 'list any allergies',
      required: true
    }
  ]
};

export const DOCTOR_FORM_FIELDS = [
  {
    type: "text",
    id: "specialty",
    name: "specialty",
    placeholder: "Enter specialty",
    label: "Specialty",
    required: true
  },
  {
    type: "text",
    id: "name",
    name: "name",
    placeholder: "Enter name",
    label: "Name",
    required: true
  },
  {
    type: "tel",
    id: "phone",
    name: "phone",
    placeholder: "XXX-XXX-XXXX",
    label: "Phone",
    required: true
  },
  {
    type: "text",
    id: "streetAddress",
    name: "streetAddress",
    placeholder: "Street address",
    label: "Street Address",
    required: true
  },
  {
    type: "text",
    id: "city",
    name: "city",
    placeholder: "City",
    label: "City",
    required: true
  },
  {
    type: "select",
    id: "state",
    name: "state",
    placeholder: "State",
    label: "State",
    options: US_STATES,
    required: true
  },
  {
    type: "text",
    id: "zipCode",
    name: "zipCode",
    placeholder: "Zip code",
    label: "Zip Code",
    required: true
  },
  {
    type: "email",
    id: "email",
    name: "email",
    placeholder: "Enter email",
    label: "Email",
    required: true
  },
  {
    type: "textarea",
    id: "notes",
    name: "notes",
    placeholder: "Enter notes",
    label: "Notes",
    required: false
  }
];

export const EMERGENCY_CONTACT_FIELDS = [
  {
    id: "name",
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "Enter name",
    required: true
  },
  {
    id: "phone",
    type: "tel",
    name: "phone", 
    label: "Phone",
    placeholder: "Enter phone number",
    required: true
  },
  {
    id: "relationship",
    type: "text",
    name: "relationship",
    label: "Relationship",
    placeholder: "Enter relationship",
    required: true
  }
];
