
export type TMarkdownResult = {
   content: string,
   metadata: TMetaData,
   textByLanguage: TTextByLanguage[]
}
export type TTextByLanguage={ language: string, text: string };

export type TMetaData = {
   key: number,
   name: string,
   addData: Date,
   updateData: Date,
   keywords: string[],
   languages: TLanguage[],
}

export type TLanguage = { key: string, value: string };