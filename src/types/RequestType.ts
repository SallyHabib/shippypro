export type IRequestType = {
    source: string
    destination: string
    deptDate: string
    returnDate?: string
    tripType: string | "oneway"
}