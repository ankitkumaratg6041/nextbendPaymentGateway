export const QUESTION_TYPES = {
    TEXT: 'text',
    TEXTAREA: 'textarea',
    YES_NO: 'yesno',
  };
  
  export const questionsByCategory = {
    'Website Development': [
      { key: 'website_type', label: 'What kind of website do you need?', type: QUESTION_TYPES.TEXT },
      { key: 'page_count', label: 'How many pages do you expect it to have?', type: QUESTION_TYPES.TEXT },
      { key: 'content_help', label: 'Do you need us to write the content?', type: QUESTION_TYPES.YES_NO },
      { key: 'color_guide', label: 'Do you have a brand guide?', type: QUESTION_TYPES.YES_NO },
      { key: 'hosting', label: 'Do you need hosting?', type: QUESTION_TYPES.YES_NO },
      { key: 'has_domain', label: 'Do you already have a domain?', type: QUESTION_TYPES.YES_NO },
      { key: 'references', label: 'Any website references you like?', type: QUESTION_TYPES.TEXTAREA },
      { key: 'seo', label: 'Need SEO and optimization?', type: QUESTION_TYPES.YES_NO },
      { key: 'lead_capture', label: 'Need contact/lead form?', type: QUESTION_TYPES.YES_NO },
      { key: 'features', label: 'Must-have features? (You can also upload sketches or references in the next step)', type: QUESTION_TYPES.TEXTAREA },
      { key: 'deadline', label: 'Any deadline?', type: QUESTION_TYPES.TEXT },
    ],
  
    'Branding': [
      { key: 'brand_elements', label: 'What do you want us to help with?', type: QUESTION_TYPES.TEXTAREA },
      { key: 'has_logo', label: 'Do you have a logo/materials already?', type: QUESTION_TYPES.YES_NO },
      { key: 'color_style', label: 'What colors/styles do you prefer?', type: QUESTION_TYPES.TEXT },
      { key: 'brand_refs', label: 'Any brand inspirations or competitors? (Upload any reference files in next step)', type: QUESTION_TYPES.TEXTAREA },
    ],
  
    // Add others here: Advertising, Strategy, Other...
  };
  