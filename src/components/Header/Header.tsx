import React from 'react';
import styles from './Header.module.scss';
import halo from '../image/halo.png';
const Header = () => {
	return (
		<div className={styles.headerWrapper}>
			<div className={styles.headerText}>
				<h1>Weather APP</h1>
				<h5>Check the weather in your city</h5>
			</div>
			<img src={halo} className={styles.headerImg} />
		</div>
	);
};

export default Header;
