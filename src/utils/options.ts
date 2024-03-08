export interface Option {
    title: string,
    icon: string,
    handleSelect: () => void
}

export const options: Option[] = [
    {
        title: 'Поделиться в социальных сетях',
        icon: 'share.svg',
        handleSelect: () => console.log('опция поделиться')
    },
    {
        title: 'Редактировать страницу',
        icon: 'edit.svg',
        handleSelect: () => console.log('опция редачить')
    },
    {
        title: 'Удалить страницу',
        icon: 'delete.svg',
        handleSelect: () => console.log('опция удалить')
    },
]