import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "Weather"


  return (


    <pre style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />

      {/* ویدیوی پس زمینه */}
      <div>
        <video autoPlay loop style={{ float: "right", width: "140%", height: "200%", marginLeft: "100px", marginRight: "-200px", marginTop: "-200px", borderRadius: "20px" }}><source src='/ali.mp4' type='video/mp4'></source></video>
      </div>



      <Window title={name} style={{ float: "right", minHeight: 200,backgroundImage:"url('/wp.webp')", fontFamily: "sans-serif", fontSize: 28, opacity: "60%", color: "white", marginRight: 68, marginTop: -530, backgroundColor: "#11045C", width: 800, height: 500 }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}
      </Window>


      <pre style={{ float: "left", width: 800, color: "white", marginTop: -500, opacity: 3 }}>

        {/* ساعت و تاریخ */}
        <div style={{ opacity: 1, position: "fixed", fontFamily: "sans-serif", color: "#B8AAAA", fontSize: 20, marginLeft: 80 }}>
          {(props.info.localObsDateTime as number)}
        </div >
        {/* اسم شهر و کشور */}
        <i style={{ position: "fixed", color: "white", textShadow: "4px 4px black", fontFamily: "sans-serif", fontSize: 50, marginLeft: 80, marginTop: 16 }}>
          {(props.location.areaName[0].value)} , {(props.location.country[0].value)}
        </i>
        {/* دما(سانتی گراد) */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 60, marginLeft: 80, marginTop: 55 }}>
          {(props.info.temp_C)}<sup>o</sup>C /
        </div >
        {/* دما (فارنهایت) */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", color: "#B8AAAA", fontSize: 30, marginLeft: 265, marginTop: 95 }}>
          {(props.info.temp_F)}<sup>o</sup>F
        </div>
        {/* دمای احساس شده */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 20, marginLeft: 80, marginTop: 136 }}>
          Feel like {(props.info.FeelsLikeC)}<sup>o</sup>C. sunny with scattered clouds
        </div>
        {/* خط عمودی */}
        <hr className="rotate" style={{ marginLeft: 450, marginTop: 230, width: 350, color: "white" }} >
        </hr>
        {/* طلوع آفتاب */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 20, marginLeft: 630, marginTop: -190 }}>
          <img src="/sunrise.png" style={{ width: 90 }} />
          <br-xxx />
          <div style={{ marginLeft: 9 }}>{(props.weather.astronomy[0].sunrise)}</div>
          -------------------------
        </div>
        {/* غروب آفتاب */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 20, marginLeft: 740, marginTop: -190 }}>
          <img src="/sunset.png" style={{ width: 90 }} />
          <br-xxx />
          <div style={{ marginLeft: 9 }}>{(props.weather.astronomy[0].sunset)}</div>
        </div>

        {/* میزان بارش */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 20, marginLeft: 630, marginTop: -40 }}>
          <img src="/rain.png" style={{ width: 60 }} />
          <br-xxx />
          <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 20, marginLeft: 5, marginTop: 0 }}>
            {(props.info.precipMM)}mm <br />  {(props.info.precipInches)}<sup>''</sup><br />
            <p style={{ marginLeft: -5, fontSize: 20, fontFamily: "sans-serif" }}>-------------------------</p>
          </div>
        </div>

        {/* سرعت باد */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 20, marginLeft: 710, marginTop: -40 }}>
          <img src="/windspeed.png" style={{ width: 60 }} />
          <br-xxx />
          <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 20, marginLeft: 0, marginTop: 0 }}>
            {(props.info.windspeedKmph)}km/hr <br /> {(props.info.windspeedMiles)}M/hr<br />
          </div>
        </div>

        {/* جهت باد */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 20, marginLeft: 790, marginTop: -35 }}>
          <img src="/winddir.png" style={{ width: 60 }} />
          <br-xxx />
          <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 19, marginLeft: 5, marginTop: -5 }}>
            {(props.info.winddir16Point)} <br />{(props.info.winddirDegree)}<sup>o</sup><br />
          </div>
        </div>
        {/* میدان دید و رطوبت */}
        <div style={{ position: "fixed", fontFamily: "sans-serif", fontSize: 16, marginLeft: 635, marginTop: 110 }}>
          Humidity : {(props.info.humidity)} %
          <br-x />
          <br-xxx />
          Visibility : {(props.info.visibility)} KM / {(props.info.visibilityMiles)} Mile
        </div>
        <p style={{textAlign:"center",marginTop:210,marginLeft:-70}}>Developed by Turing team(TiraDev)</p>
      </pre>

    </pre>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
  let res = await fetch("https://cdn.ituring.ir/research/api/weather/")
  let data = await res.json()
  let location = data.nearest_area[0]
  let info = data.current_condition[0]
  let weather = data.weather[0]




  return {
    props: {
      data: global.QSON.stringify({
        session,
        location,
        info,
        weather,
        // nlangs,
      })
    },
  }
}