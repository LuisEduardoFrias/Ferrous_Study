
export type TClass =  {
    key: string,
    name: string,
    addInfo: {
      addData: string,
      user: {
        key: string,
        name: string,
      }
    },
    updateInfo: {
      updateData: string,
      user: {
        key: string,
        name: string,
      }
    },
    keywords:string[]
  }