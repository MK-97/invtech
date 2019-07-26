
const fetch = require("node-fetch")

const api_url = "http://api.apixu.com/v1/current.json?key=04a82262d4ad4a1c946213151191907&q="


//collect args from commandline
let args = process.argv.slice(2)

//clear white space from all array elements
for(let i = 0; i < args.length; i++){
  args[i] = args[i].replace(/\s+/g, '')
}


let temp_args = []

//accounting for cities for more than one word, replacing whitespace with %20 which is seen as whitespace
for(let i = 0; i < args.length; i++){

    if(i < args.length && args[i][args[i].length-1] != ","){
      args[i] += "%20"
    }

    temp_args += args[i]
}


args = temp_args.split(",")

async function main(){

  for(let i = 0; i < args.length; i++){

    let api_call = api_url + args[i]

    await fetch(api_call)
      .then(res => res.json())
      .then(body => ParseData(body))

  }

}


function ParseData(body){

  console.log(body.location.name + ":")
  console.log(body.current.temp_f)
  console.log(body.location.localtime)
  console.log('\n')

}
main()

