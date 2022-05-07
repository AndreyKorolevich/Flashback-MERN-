export const updateTagsType = (tags: string | Array<string>) => {
   const separator = /[,\s]/ // TODO fix, use ',' or ' '
   return typeof tags === 'string' ? tags.split(separator) : tags
}