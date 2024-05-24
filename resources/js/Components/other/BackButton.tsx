import { Button } from "@mui/material"

export const BackButton = () => {
    const handleBack = () => {
        window.history.back();
    }
    return (
        <Button color="warning" variant="outlined" onClick={handleBack}>
            戻る
        </Button>
    )
}