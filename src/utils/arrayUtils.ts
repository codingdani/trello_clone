type Item = {
    id: String
}

export const findItemIndexById = <TItem extends Item>(items: TItem[], id: string) => {
    return items.findIndex((item: TItem) => item.id === id)
}
