export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/RockPaperScissors',
		name: 'RockPaperScissors',
		component: './RockPaperScissors',
		icon: 'CheckSquareOutlined',
	},
	{
		path: '/ProfileCard',
		name: 'Profile Card',
		component: './ProfileCard',
		icon: 'CheckSquareOutlined',
	},

	// {
	// 	path: '/question-management',
	// 	name: 'Question-Management',
	// 	component: './Question',
	// 	icon: 'ReadOutlined',
	// },
	{
		path: "/room-management",
		layout: false,
		name: "Room-Management",
		icon: "HomeOutlined",
		routes: [
		  { path: "/room-management", component: "@/pages/Room/RoomManagement", exact: true },
		  { path: "/room-management/list", name: "Quản lý Phòng", component: "@/pages/Room/RoomList" },
		  { path: "/room-management/form", name: "Thêm/Sửa Phòng", component: "@/pages/Room/RoomForm" }
		],
	  },	  
	  
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
	
];