export const formatDateToBrazilian = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
}

export const getStatus = (status: string, styles: any) => {
    if (status === "low") {
        return {
            label: "Baixa",
            Styles: styles.low_priority
        }
    }
    if (status === "medium") {
        return {
            label: "Média",
            Styles: styles.medium_priority
        }
    }
    if (status === "high") {
        return {
            label: "Alta",
            Styles: styles.high_priority
        }
    }

    return {
        label: "Status desconhecido",
        Styles: "",
    }
}

export const format_text_to_show_only_100_characters = (text: string) => {
    return text.length > 60 ? text.slice(0, 60) + "..." : text
}
