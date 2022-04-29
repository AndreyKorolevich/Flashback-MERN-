export const updateTagsType = (tags: string | Array<string>) => {
   const separator = /[,\s]/
   return typeof tags === 'string' ? tags.split(separator) : tags
}