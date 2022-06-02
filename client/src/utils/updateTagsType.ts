export const updateTagsType = (tags: string | Array<string>) => {
   return (typeof tags === 'string'
     ? tags
       .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,' ')
       .replace( /\s\s+/g, ' ' )
       .trim()
       .split(' ')
     : tags)
}