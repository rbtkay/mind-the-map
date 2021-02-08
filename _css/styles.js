import { StyleSheet } from 'react-native';

export const COLORS = {
	background: '#CC54B6',
	white_containers: '#F2F2F2',
	green_buttons: '#72C5AA',
	red_buttons: '#FF5E78',
	Main_font_color: '#C15DA7',
	Darker_font_color: '#5F1849',
	Red_font_color: '#FF5E78',
	Grey_font_color: '#CCCCCC',
};

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
		height: 50,
		justifyContent: 'center',
		backgroundColor: '#ffff', //'#0A8754',
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,

		elevation: 16,
	},

	coolBtn: {
		top: 30,
		width: '40%',
		height: 60,
		borderRadius: 20,
		alignItems: 'center',
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

	title: { fontFamily: 'Roboto_medium', fontSize: 20, color: COLORS.background, margin: 10 },

	titleContainer: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginLeft: 10,
		marginTop: 10,
		flexDirection: 'row',
	},

	elevatedContainer: {
		backgroundColor: 'white',
		borderRadius: 20,
		flex: 1,
		margin: 10,
		marginTop: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,

		elevation: 5,
	},

	tinyImg: {
		width: 20,
		height: 20,
	},

	mediumImg: {
		width: 40,
		height: 40
	}
});

export default styles;
