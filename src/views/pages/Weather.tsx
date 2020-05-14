import React from 'react';
import axios from 'axios';
import { Grid, Item, Divider, Loader, Dimmer } from 'semantic-ui-react';

interface State{
	info : info[],
	active : boolean
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
				info : [],
				active: true
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

			this.setState({ info : set, active: false })

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
		// let id, idx;
		// let infoList:object[][] = [];
		// let columnCount = 6;
		// this.state.info.forEach( (item, i) => {
		// 		id = Math.floor(i/columnCount);
		// 		idx = i%columnCount;
		// 		if(idx === 0) infoList[id] = [];
		// 		infoList[id][idx] = <Grid.Column key={i}>
		// 			<Item>
		// 				<Item.Content>
		// 					<Item.Header>{item.name}</Item.Header>
		// 					<Item.Description>{item.value}
		// 					</Item.Description>
		// 				</Item.Content>
		// 			</Item>
		// 			<Divider></Divider>
		// 		</Grid.Column>
				
		// })
		let { active } = this.state;
		return (
			
			<div>
			
			<Dimmer active={active} page inverted>
				<Loader inline>Loading</Loader>
			</Dimmer>
      
			<Grid  doubling columns={5}>
				{/* { infoList.map( (items, i) => {
					return (
					<Grid.Row>
						{items.map(item => item)}
					</Grid.Row>		
					) */}
				{this.state.info.map( (item, i) => {
					return <Grid.Column textAlign="center"  key={i}>
						<Item>
							<Item.Content>
								<Item.Header>{item.name}</Item.Header>
								<Item.Description>{item.value}
								</Item.Description>
							</Item.Content>
						</Item>
						<Divider></Divider>
					</Grid.Column>
			})}
			
			</Grid>
			</div>
		);
	}
}

export default Weather;