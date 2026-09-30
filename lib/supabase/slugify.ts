const slugify = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]/g, "-")
    .replace(/[-+]/g, "-")
};

export default slugify;