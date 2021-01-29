import { StyleSheet } from 'react-native';
import { APP_COLOR } from '../assets/constant_styles';

const styles = StyleSheet.create({
	container: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 8,
		paddingBottom: 8,
		flex: 1,
	},
	mainBtn: {
		width: '100%',
		height: 80,
		justifyContent: 'center',
		backgroundColor: '#ffff', //'#0A8754',
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,

		elevation: 16,
	},

	smallBtn: {
		width: 80,
		height: 60,
		justifyContent: 'center',
		backgroundColor: '#ffff', //'#0A8754',
		borderRadius: 25,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,

		elevation: 16,
	},

	headerBtn: {
		height: 60,
		width: 60,
		justifyContent: 'center',
		backgroundColor: '#ffff', //'#0A8754',
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,

		elevation: 16,
	},

	list_item: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},

	title: { fontWeight: 'bold', fontSize: 20, color: APP_COLOR, margin: 10 },

	titleContainer: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginLeft: 10,
		marginTop: 10,
		flexDirection: 'row',
	},
});

export default styles;
