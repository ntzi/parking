import { User } from "../../../../src/api/models/user.js";
import { issue } from "../../../../src/api/services/jwToken.js";
import { Roles } from "../../../../src/api/types/auth/authorized.js";

const createUsers = async () => {
	const data = [
		{
			name: "nikos-admin",
			email: "nikos+admin@parking.app",
			role: Roles.ADMIN,
		},
		{
			name: "nikos-user",
			email: "nikos+user@parking.app",
			role: Roles.USER,
		},
	];

	const users: User[] = [];
	data.map((user) => {
		const newUser: User = new User();
		newUser.name = user.name;
		newUser.email = user.email;
		newUser.role = user.role;
		users.push(newUser);
	});

	try {
		await User.save(users);
	} catch (err) {
		console.error(err);
	}

	return users;
};

const getAdminToken = async () => {
	const user = await User.findOne({ where: { role: Roles.ADMIN } });
	if (!user) return;
	return getLoginToken(user?.id);
};

const getUserToken = async () => {
	const user = await User.findOne({ where: { role: Roles.USER } });
	if (!user) return;
	return getLoginToken(user?.id);
};

const getLoginToken = async (id: number) => {
	const user = await User.findOne({ where: { id } });

	const token = issue({ id: user?.id });
	return token;
};

export { createUsers, getAdminToken, getUserToken, getLoginToken };
