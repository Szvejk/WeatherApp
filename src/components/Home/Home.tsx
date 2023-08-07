import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import axios from 'axios';
import chmura from '../image/chmura.png';
import sun from '../image/sun.png';
import rain from '../image/rain.png';
import headache from '../image/headache.png';
import okej from '../image/okej.png';
const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [city, setCity] = useState([]);
	const [filterValue, setFilterValue] = useState([]);

	interface Result {
		stacja: string;
		data_pomiaru: string;
		kierunek_wiatru: string;
		temperatura: number;
		suma_opadu: number;
		cisnienie: number;
	}

	const info = () => {
		axios
			.get(' https://danepubliczne.imgw.pl/api/data/synop')
			.then((res) => {
				console.log(res.data);
				setCity(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		info();
	}, []);

	const filter = () => {
		setFilterValue(
			city.filter((el: Result) =>
				el.stacja.toLowerCase().includes(inputValue.toLowerCase())
			)
		);
	};
	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			filter();
		}
	};
	return (
		<section className={styles.inputApi}>
			<div className={styles.inputWrapper}>
				<input
					type='text'
					className={styles.input}
					placeholder='Enter your city...'
					onChange={(el) => setInputValue(el.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<button onClick={() => filter()}>Search</button>
			</div>{' '}
			<div className={styles.filterViaInput}>
				{filterValue.length === 0 ? 'Nie ma takiego miasta w naszej bazie' : ''}
				{filterValue.length
					? filterValue.map((el: Result, index: number) => (
							<div className={styles.divStacja} key={index}>
								<div>
									<span className={styles.searchedCity}>{el.stacja}</span>
								</div>

								<div>
									<span>Zmierzono w dniu: {el.data_pomiaru}</span>
								</div>

								<div>
									<div className={styles.flexWeather}>
										{el.temperatura ? (
											el.temperatura < 20 ? (
												<img src={chmura} className={styles.chmura} />
											) : (
												<img src={sun} className={styles.sun} />
											)
										) : null}{' '}
										<span>{el.temperatura} stopni °C </span>{' '}
									</div>
									<div>
										{el.cisnienie ? (
											el.cisnienie > 1000 ? (
												<img src={headache} className={styles.headache} />
											) : (
												<img src={okej} className={styles.okejLike} />
											)
										) : null}

										<span>Ciśnienie: {el.cisnienie}</span>
									</div>

									<div className={styles.isItRaining}>
										<span>Czy będzie padać? </span>
										{el.suma_opadu ? (
											el.suma_opadu > 5.0 ? (
												<div className={styles.rainCorrect}>
													<span className={styles.answerCorrect}>Tak</span>
													<img src={rain} className={styles.rain} />
												</div>
											) : (
												'Nie '
											)
										) : null}
									</div>
								</div>
							</div>
					  ))
					: null}
			</div>
		</section>
	);
};

export default Home;
