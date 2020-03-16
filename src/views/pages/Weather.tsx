import React from 'react';
import axios from 'axios';
import '#/pages/weather.scss';

interface State{
	info : info[]
}
interface info{
	name: string,
	value: string | number 
}

class Weather extends React.Component<object,State>{

	constructor(props:object){
		super(props);

		this.getData();

		this.state = {
				info : []
		};
	}

	public getData(): void {
			
		let url = process.env._API;
		let id = process.env._ACCESS_ID;
		let cityId = 1835848;
		let params = "?id="+cityId+"&APPID="+id;
		let d;
		let set;
		axios.get(url+params).then((res)=>{
			
			d = res.data;
			
			set = [
				{ name: "날씨", value: d.weather[0]['main'] },
				{ name: "날씨 요약", value: d.weather[0]['description'] },
				{ name: "기온", value: this.tempFixed(d.main.temp) },
				{ name: "체감온도", value: this.tempFixed(d.main.feels_like) },
				{ name: "최저기온", value: this.tempFixed(d.main.temp_min) },
				{ name: "최고기온", value: this.tempFixed(d.main.temp_max) },
				{ name: "기압", value: d.main.pressure+' hPa' },
				{ name: "습도", value: d.main.humidity+ ' %' },
				{ name: "시정", value: d.visibility / 1000 +' km' },
				{ name: "풍속", value: d.wind.speed+ ' km/h' },
				{ name: "풍향", value: d.wind.deg },
				{ name: "돌풍", value: d.wind.gust? d.wind.gust : '없음' },
				{ name: "구름", value: d.clouds.all },
				{ name: "일출", value: this.timeToDate(d.sys.sunrise) },
				{ name: "일몰", value: this.timeToDate(d.sys.sunset) },
			]

			this.setState({ info : set })

		}).catch((err)=>{
			console.log(err);
		});								
	}
	timeToDate(t:number){
		
		let date = new Date(t * 1000);
		let hours = date.getHours();
		let minutes = "0" + date.getMinutes();
		let seconds = "0" + date.getSeconds();
		return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}
	tempFixed(t:number):any{
		let k = 273.15;
		return ( t - k ).toFixed(1)+' °C'
	}

	render(){
		return (
			<div className="contents">
				<div className="wrap">
					<ul className="weather__info__list">
						{this.state.info.map( (item, index) => {
							return  (
								<li className="weather__info__item" key={index}>
									<span className="key">{item.name}</span>
									<span className="value">{item.value}</span>
								</li>
							); 
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default Weather;