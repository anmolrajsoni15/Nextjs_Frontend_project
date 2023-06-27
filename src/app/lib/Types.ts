export interface ButtonProps {
    className?: string;
    text: string;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    disabled?: boolean
  }

export interface ButtonWithIconProps{
    text?:string
    className?:string
    iconURL:string
    imgAlt:string
}


export interface InputProps {
    className?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    name?:string
  }

  export interface DataSourceCardProps {
    imgURL:string
    linkURL:string
    linkText:string
    imgAlt:string
    title:string
    subtitle:string
  }

  export interface IntegrationCardProps {
    imgUrl:string
    imgAlt:string
    title:string
    text:string
  }

  export interface Bloclist{
    blocId:string
    name:string
    createdAt:string
    refreshedAt:string
  }

  export interface Params{
    params:{
      blocId:string
    }
  }