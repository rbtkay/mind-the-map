import { CHALLENGES_STATUS } from '../_utils/constants';
import { firebase } from './config/firebaseConfig';

const challengesRef = firebase.firestore().collection('challenges');

exports.getChallengeById = challenge_id => {
	return new Promise((resolve, reject) => {
		challengesRef
			.doc(challenge_id)
			.get()
			.then(result => {
				resolve({ id: result.id, ...result.data() });
			})
			.catch(e => reject(e));
	});
};

exports.getUserChallenges = async (email, status = '*') => {
	return new Promise(async (resolve, reject) => {
		let query_1 = challengesRef.where('player_1', '==', email);
		let query_2 = challengesRef.where('player_2', '==', email);

		let querySnapshot_1;
		let querySnapshot_2;

		if (status === '*') {
			querySnapshot_1 = await query_1.get();
			querySnapshot_2 = await query_2.get();
		} else if (Object.values(CHALLENGES_STATUS).includes(status)) {
			querySnapshot_1 = await query_1.where('status', '==', status).get();
			querySnapshot_2 = await query_2.where('status', '==', status).get();
		} else {
			reject(`No know status '${status}'`);
		}

		const challenges = [];
		querySnapshot_1.forEach(challenge => {
			challenges.push({ id: challenge.id, ...challenge.data() });
		});
		querySnapshot_2.forEach(challenge => {
			challenges.push({ id: challenge.id, ...challenge.data() });
		});

		resolve(challenges);
	});
};

exports.getUserOnGoingChallenges = email => {
	return new Promise(async (resolve, reject) => {
		const challenges_with_player_1 = challengesRef
			.where('player_1', '==', email)
			.where('status', '==', 'ONGOING')
			.get();
		const challenges_with_player_2 = challengesRef
			.where('player_2', '==', email)
			.where('status', '==', 'ONGOING')
			.get();

		const [
			challenges_player_1_querySnapshot,
			challenges_player_2_querySnapshot,
		] = await Promise.all([challenges_with_player_1, challenges_with_player_2]);

		const challenges = [];
		challenges_player_1_querySnapshot.forEach(challenge => {
			challenges.push(challenge.data());
		});
		challenges_player_2_querySnapshot.forEach(challenge => {
			challenges.push(challenge.data());
		});

		resolve(challenges);
	});
};

exports.getUserCompletedChallenges = email => {
	return new Promise(async (resolve, reject) => {
		const challenges_with_player_1 = challengesRef
			.where('player_1', '==', email)
			.where('status', '==', 'COMPLETED')
			.get();
		const challenges_with_player_2 = challengesRef
			.where('player_2', '==', email)
			.where('status', '==', 'COMPLETED')
			.get();

		const [
			challenges_player_1_querySnapshot,
			challenges_player_2_querySnapshot,
		] = await Promise.all([challenges_with_player_1, challenges_with_player_2]);

		const challenges = [];
		challenges_player_1_querySnapshot.forEach(challenge => {
			challenges.push(challenge.data());
		});
		challenges_player_2_querySnapshot.forEach(challenge => {
			challenges.push(challenge.data());
		});

		resolve(challenges);
	});
};

exports.getUserWaitingChallenges = email => {
	return new Promise(async (resolve, reject) => {
		const challenges_with_player_1 = challengesRef
			.where('player_1', '==', email)
			.where('status', '==', 'WAITING')
			.get();
		const challenges_with_player_2 = challengesRef
			.where('player_2', '==', email)
			.where('status', '==', 'WAITING')
			.get();

		const [
			challenges_player_1_querySnapshot,
			challenges_player_2_querySnapshot,
		] = await Promise.all([challenges_with_player_1, challenges_with_player_2]);

		const challenges = [];
		challenges_player_1_querySnapshot.forEach(challenge => {
			challenges.push(challenge.data());
		});
		challenges_player_2_querySnapshot.forEach(challenge => {
			challenges.push(challenge.data());
		});

		resolve(challenges);
	});
};

exports.setChallengeRoundScore = (challenge_id, score, user_email) => {
	return new Promise((resolve, reject) => {
		challengesRef
			.doc(challenge_id)
			.get()
			.then(doc => {
				const { rounds_scores, pois } = doc.data();

				let new_round_score = {score, user_email}
				let new_update = {};
				if (rounds_scores.length < 5)
					new_update = { rounds_scores: [...rounds_scores, new_round_score] };
				else // the sixth score is being inserted
					new_update = {
						rounds_scores: [...rounds_scores, new_round_score],
						status: CHALLENGES_STATUS.COMPLETED,
					};

				doc.ref.update(new_update);
				resolve(doc.id);
			})
			.catch(e => reject(e));
	});
};
