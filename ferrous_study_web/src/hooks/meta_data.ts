
export function getMetaData(text: string,langaje:string) {
  const index = text.lastIndexOf("---")
  
  if(index === -1) 
  throw Error("El markdown no tiene la meta data.");
  
  const meta = text.substr(0,index);
  
  
  const metadata="", content="";
  return {metadata,content};
}