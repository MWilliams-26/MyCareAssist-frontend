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
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
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
    type: "text",
    id: "state",
    name: "state",
    placeholder: "State",
    label: "State",
    maxLength: 2,
    required: true
  },
  {
    type: "text",
    id: "zipCode",
    name: "zipCode",
    placeholder: "Zip code",
    pattern: "[0-9]{5}",
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
