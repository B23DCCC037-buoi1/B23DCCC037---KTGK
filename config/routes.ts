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
	{
		path: '/travel-itinerary',
		layout: false,
		name: 'Travel itinerary',
		icon: 'ReadOutlined',
		routes: [
			{
				path: '/travel-itinerary/statistical',
				layout: true,
				name: 'Trang chủ',
				component: '@/pages/Travel/HomePage',
			},
			{
				path: '/travel-itinerary/planner',
				layout: true,
				name: 'Lịch trình',
				component: '@/pages/Travel/PlannerPage',
			},
			{
				path: '/travel-itinerary/budget',
				layout: true,
				name: 'Ngân sách',
				component: '@/pages/Travel/BudgetPage',
			},
			{
				path: '/travel-itinerary/admin',
				layout: true,
				name: 'Admin',
				component: '@/pages/Travel/AdminPage',
			},
		],
	},
	{
		path: '/Note',
		name: 'Note',
		component: './Note',
		icon: 'PushpinOutlined',
	},

	{
		path: '/TaskManager',
		name: 'TaskManager',
		component: './TaskManager',
		icon: 'PushpinOutlined',
	},


	// {
	// 	path: '/question-management',
	// 	name: 'Question-Management',
	// 	component: './Question',
	// 	icon: 'ReadOutlined',
	// },
	  
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