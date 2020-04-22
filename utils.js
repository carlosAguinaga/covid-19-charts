
export async function getData(strCoutry) {

  const responseConfirmed = await fetch(`https://api.covid19api.com/total/dayone/country/${strCoutry}/status/confirmed`)
  const responseDeaths = await fetch(`https://api.covid19api.com/total/dayone/country/${strCoutry}/status/deaths`)
  const responseRecovered = await fetch(`https://api.covid19api.com/total/dayone/country/${strCoutry}/status/recovered`)
  const dataConfirmed = await responseConfirmed.json()
  const dataDeaths = await responseDeaths.json()
  const dataRecovered = await responseRecovered.json()
  
  const data = {
    confirmed: dataConfirmed,
    deaths: dataDeaths,
    recovered : dataRecovered,
  }
  return data
}
  
  export function sortByDate(data) {
    return import('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js')
    .then(() => {
      const recovered = _.sortBy(Object.values(data.recovered), ['date'])
      const deaths = _.sortBy(Object.values(data.deaths), ['date'])
      const confirmed = _.sortBy(Object.values(data.confirmed), ['date'])
      return {
        recovered,
        deaths,
        confirmed,
      }
    })
  }
  
  export async function getTotalCasesByDate(strCoutry) {
    const data = await getData(strCoutry)
    const dataByDate = {
      confirmed: {},
      recovered: {},
      deaths: {},
    }
    return data
  }
