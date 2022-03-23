declare module 'co-prompt';
declare interface ConfigType {
  url: string
  branch: string
}
declare type AllType = { [key: string]: ConfigType }
declare type PropertyType = 'url' | 'branch'
declare class ShinpCli {
  config: configStore
  list: () => void
  add: () => void
  update: () => void
  remove: () => void
  create: () => void
  clear: () => void
  reset: () => void
  path: () => void
}