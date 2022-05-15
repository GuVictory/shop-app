const myHeaders = new Headers();
myHeaders.append("apikey", process.env.REACT_APP_COURSE_API_KEY ?? '');

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

export type ActualCourseType = Response & {
    success: boolean;
    source: string;
    quotes: {
        USDRUB: number;
    };
}
export const getCourse = (): Promise<ActualCourseType> =>
    fetch("https://api.apilayer.com/currency_data/live?source=USD&currencies=RUB", requestOptions) as Promise<ActualCourseType>;