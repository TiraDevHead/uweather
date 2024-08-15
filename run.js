;(async()=>{
    let json=await(await fetch("https://irmapserver.ir/research/api/weather")).json()

    console.log(JSON.stringify(json,null,2))

})()