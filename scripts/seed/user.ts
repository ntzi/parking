import { User } from '../../src/api/models/user.js';
import { Roles } from '../../src/api/types/auth/authorized.js';

export class UserSeeder {
	constructor() {
		// Do nothing
	}

	private data = () => {
		return [
			{
				name: 'nikos-admin',
				email: 'nikos+admin@parking.app',
				role: Roles.ADMIN,
			},
			{
				name: 'nikos-user',
				email: 'nikos+user@parking.app',
				role: Roles.USER,
			},
		];
	};

	private records = () => {
		const users: User[] = [];

		this.data().map(user => {
			const newUser: User = new User();
			newUser.name = user.name;
			newUser.email = user.email;
			newUser.role = user.role;
			users.push(newUser);
		});

		return users;
	};

	public seed = async () => {
		try {
			await User.save(this.records());
		} catch (err) {
			console.error(err);
		}
	};
}
