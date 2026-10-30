import { renderToString } from "react-dom/server";
import { Link, NavLink, Outlet, Route, Routes, StaticRouter, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/data/content.ts
/**
* ============================================================
* 全站页面文案与数据
* 【替换】实际运营后，各板块数据在此统一修改
* ============================================================
*/
/** 导航 */
var navItems = [
	{
		to: "/",
		label: "首页"
	},
	{
		to: "/constellation",
		label: "星座运营"
	},
	{
		to: "/remote-sensing",
		label: "遥感观测"
	},
	{
		to: "/solutions",
		label: "解决方案"
	},
	{
		to: "/about",
		label: "关于我们"
	},
	{
		to: "/contact",
		label: "联系我们"
	}
];
var homeHero = {
	eyebrow: "CONSTELLATION & EARTH OBSERVATION",
	titleTop: "以苍穹之眼",
	titleAccent: "观万物之变",
	sub: "依托自研低轨星座与星地协同数据服务，为农业、林业、海洋、应急与城市治理提供高时效、高分辨率的空间信息服务。",
	ctaPrimary: "了解星座服务",
	ctaSecondary: "遥感数据平台",
	hudTags: [
		"LOW EARTH ORBIT",
		"0.5M RESOLUTION",
		"GLOBAL COVERAGE"
	]
};
/** 首页核心能力双支柱 */
var homeCapabilities = [{
	key: "constellation",
	title: "星座运营",
	desc: "自研低轨卫星星座，轨道面协同组网，星间链路 + 地面站双通道，覆盖全球、全天候回传。",
	points: [
		"8 轨道面 · 128 颗在轨",
		"星间激光 + Ka 双链路",
		"全球覆盖 · 分钟级回传"
	],
	to: "/constellation"
}, {
	key: "sensing",
	title: "遥感观测",
	desc: "光学 / SAR / 多光谱 / 高光谱多载荷并行，分钟级重访，0.5m 级分辨率，构建常态化对地观测能力。",
	points: [
		"0.5m 全色 · 2m 多光谱",
		"1.5 小时重访周期",
		"四类载荷协同观测"
	],
	to: "/remote-sensing"
}];
/** 首页数据看板 */
var stats = [
	{
		value: 128,
		unit: "颗",
		label: "在轨卫星"
	},
	{
		value: .5,
		unit: "m",
		label: "最高分辨率",
		decimals: 1
	},
	{
		value: 1.5,
		unit: "h",
		label: "重访周期",
		decimals: 1
	},
	{
		value: 100,
		unit: "%",
		label: "全球覆盖"
	}
];
/** 首页解决方案预览 */
var homeSolutions = [
	{
		key: "agri",
		num: "01",
		title: "智慧农业",
		desc: "长势监测、产量估测、旱情预警，服务大田与高标准农田。",
		tags: [
			"NDVI",
			"旱情",
			"估产"
		]
	},
	{
		key: "forest",
		num: "02",
		title: "林业生态",
		desc: "森林扰动监测、碳汇核算、防火预警，守护绿水青山。",
		tags: [
			"扰动",
			"碳汇",
			"防火"
		]
	},
	{
		key: "ocean",
		num: "03",
		title: "海洋观测",
		desc: "溢油识别、赤潮监测、海岸线变化，服务海洋经济与安全。",
		tags: [
			"溢油",
			"赤潮",
			"岸线"
		]
	},
	{
		key: "emergency",
		num: "04",
		title: "应急减灾",
		desc: "灾害快速评估、灾前预警、救援路径规划，分钟级响应。",
		tags: [
			"快速响应",
			"评估",
			"预警"
		]
	}
];
/** 首页新闻 */
var homeNews = [
	{
		date: "2026-07-28",
		title: "苍穹星座第 10 批 16 颗卫星成功入轨，组网进度过半",
		desc: "本次发射后，星座在轨规模达到 80 颗，区域重访能力提升至 1.5 小时。"
	},
	{
		date: "2026-06-15",
		title: "发布《2026 中国遥感数据服务白皮书》",
		desc: "白皮书系统梳理行业需求与数据服务体系，为政企客户提供选型参考。"
	},
	{
		date: "2026-05-02",
		title: "与某省应急厅共建\"空天地\"应急感知平台",
		desc: "遥感数据与地面监测联动，实现灾害 30 分钟内首张影像直达指挥中心。"
	}
];
var constellationHero = {
	crumb: "星座运营",
	title: "低轨星座 · 全球组网",
	sub: "轨道面协同设计，星间链路组网，构建覆盖全球、分钟级回传的空天地一体化星座系统。",
	meta: [
		{
			label: "在轨卫星",
			value: "128 颗"
		},
		{
			label: "轨道高度",
			value: "500–800 km"
		},
		{
			label: "覆盖范围",
			value: "全球"
		}
	]
};
var constellationParams = [
	{
		name: "轨道高度",
		value: "500 – 800 km（低轨 LEO）"
	},
	{
		name: "轨道倾角",
		value: "97.5°（太阳同步为主）"
	},
	{
		name: "轨道面数量",
		value: "8 个"
	},
	{
		name: "每面卫星",
		value: "16 颗"
	},
	{
		name: "卫星总数",
		value: "128 颗"
	},
	{
		name: "星间链路",
		value: "激光 + Ka 双链路"
	},
	{
		name: "数据下传",
		value: "全球地面站网络，分钟级"
	},
	{
		name: "在轨寿命",
		value: "≥ 7 年"
	}
];
var constellationAdvantages = [
	{
		key: "coverage",
		title: "全球覆盖",
		desc: "8 轨道面均匀分布，消除观测盲区，任意区域均可规划成像。"
	},
	{
		key: "revisit",
		title: "高频重访",
		desc: "组网后区域重访周期缩短至 1.5 小时，具备小时级应急响应能力。"
	},
	{
		key: "link",
		title: "星间互联",
		desc: "激光星间链路实现天基中继，不依赖海外地面站即可全球回传。"
	},
	{
		key: "ops",
		title: "智能运维",
		desc: "自动化在轨管理与任务规划，在轨寿命延长，运维成本行业领先。"
	}
];
var sensingHero = {
	crumb: "遥感观测",
	title: "多载荷 · 高时效对地观测",
	sub: "光学、SAR、多光谱、高光谱四类载荷并行组网，提供从原始影像到专题图件的一站式数据服务。",
	meta: [
		{
			label: "最高分辨率",
			value: "0.5 m"
		},
		{
			label: "幅宽",
			value: "120 km"
		},
		{
			label: "重访周期",
			value: "1.5 h"
		}
	]
};
var sensingPayloads = [
	{
		key: "optical",
		title: "光学成像",
		desc: "0.5m 全色 / 2m 多光谱，面向测绘、城市、农林业的高清影像。"
	},
	{
		key: "sar",
		title: "SAR 雷达成像",
		desc: "全天时全天候成像，穿透云雨，服务海洋、灾害与地表形变监测。"
	},
	{
		key: "hyper",
		title: "高光谱成像",
		desc: "上百谱段精细刻画地物光谱，服务矿产、水体与精准农业。"
	},
	{
		key: "multi",
		title: "多光谱业务",
		desc: "高频宽幅多光谱数据，支撑大范围常态化监测与变化检测。"
	}
];
var sensingProducts = [
	{
		level: "L1",
		name: "辐射校正产品",
		desc: "几何与辐射预处理后的标准影像，适配各行业二次开发。"
	},
	{
		level: "L2",
		name: "正射产品",
		desc: "高精度正射校正，DOM / DSM / DEM，直接进入 GIS 业务流。"
	},
	{
		level: "L3",
		name: "专题产品",
		desc: "NDVI、水体、地物分类等专题图件，开箱即用。"
	},
	{
		level: "L4",
		name: "应用服务",
		desc: "按行业定制的解译报告与决策支撑，端到端交付。"
	}
];
var solutions = [
	{
		num: "01",
		title: "智慧农业",
		desc: "作物长势与产量估测、旱情与病虫害监测、高标准农田数字化监管，助力农业增产增收。",
		tags: [
			"长势监测",
			"产量估测",
			"旱情预警",
			"病虫害"
		]
	},
	{
		num: "02",
		title: "林业生态",
		desc: "森林扰动与砍伐监测、碳汇核算、火点预警与过火评估，服务林业与\"双碳\"目标。",
		tags: [
			"扰动监测",
			"碳汇核算",
			"防火预警"
		]
	},
	{
		num: "03",
		title: "海洋观测",
		desc: "海上溢油识别、赤潮与绿潮监测、海岸线变迁、渔船识别，服务海洋经济与安全监管。",
		tags: [
			"溢油识别",
			"赤潮监测",
			"岸线变迁",
			"目标识别"
		]
	},
	{
		num: "04",
		title: "应急减灾",
		desc: "地震、洪涝、台风等灾害快速评估，灾前预警与灾后损失评估，分钟级影像直达。",
		tags: [
			"快速评估",
			"灾前预警",
			"损失核算"
		]
	},
	{
		num: "05",
		title: "生态环保",
		desc: "黑臭水体排查、矿山环境监测、固废堆场识别，支撑环保督察与生态红线监管。",
		tags: [
			"水体排查",
			"矿山监测",
			"固废识别"
		]
	},
	{
		num: "06",
		title: "智慧城市",
		desc: "城市三维建模、违建识别、道路与车辆监测、城市更新评估，服务城市治理精细化。",
		tags: [
			"三维建模",
			"违建识别",
			"交通监测"
		]
	}
];
var aboutIntro = {
	title: "让空间信息触手可及",
	paras: ["苍穹星座是一家专注于低轨卫星星座运营与遥感对地观测的商业航天企业。我们自主研制并运营低轨遥感星座，构建覆盖全球、分钟级回传的空天地一体化感知能力。", "我们相信，空间信息不应该只是少数机构的专属资源，而应成为千行百业触手可及的公共服务。从一粒种子的长势，到一座城市的脉动，从一片海域的平静，到一场灾害的预警——苍穹星座让\"看见\"更清晰、更及时、更普惠。"],
	vision: "成为全球领先的时空数据服务商，让每一次观测都产生价值。"
};
var milestones = [
	{
		year: "2018",
		title: "公司成立",
		desc: "完成首轮融资，组建商业航天核心团队，启动低轨星座论证。"
	},
	{
		year: "2021",
		title: "首星入轨",
		desc: "试验卫星成功发射，完成在轨技术验证，获取首批遥感影像。"
	},
	{
		year: "2023",
		title: "组网启动",
		desc: "首批 16 颗业务卫星发射，星座开始提供区域常规观测服务。"
	},
	{
		year: "2025",
		title: "全球覆盖",
		desc: "在轨规模达 96 颗，实现全球覆盖，重访周期进入小时级。"
	},
	{
		year: "2026",
		title: "规模运营",
		desc: "星座规模 128 颗，服务政企客户 200+，开启规模化商业运营。"
	}
];
var qualifications = [
	{
		key: "cert",
		title: "资质体系",
		desc: "具备卫星制造、发射服务与数据处理全链条资质，通过 ISO 质量体系认证。"
	},
	{
		key: "team",
		title: "核心团队",
		desc: "来自航天院所与头部科技企业，平均从业超过 10 年，主导过多型卫星研制。"
	},
	{
		key: "partner",
		title: "伙伴网络",
		desc: "与多家发射服务商、地面站运营商、行业头部企业建立长期战略合作。"
	}
];
var contactMethods = [
	{
		label: "商务合作",
		value: "400-000-0000",
		hint: "周一到周五 9:00 - 18:00",
		mono: true
	},
	{
		label: "官方邮箱",
		value: "contact@celestra.space",
		hint: "24 小时内回复",
		mono: true
	},
	{
		label: "总部地址",
		value: "北京市海淀区 ××× 科技产业园 5 号楼",
		hint: "欢迎预约到访",
		mono: false
	}
];
//#endregion
//#region src/data/site.ts
/**
* ============================================================
* 全站品牌信息集中配置
* 【替换】所有品牌信息都改这个文件，改动将同步全站
* （导航 / 页脚 / 各页头部 / 页面标题 / 元信息）
* ============================================================
*/
var site = {
	nameZh: "苍穹星座",
	nameEn: "CELESTRA",
	slogan: "以苍穹之眼，观万物之变",
	tagline: "星座运营与遥感观测服务商，构建空天地一体化感知能力",
	phone: "400-000-0000",
	email: "contact@celestra.space",
	address: "北京市海淀区 ××× 科技产业园 5 号楼",
	icp: "京ICP备 00000000 号",
	hours: "工作日 9:00 - 18:00"
};
`${site.nameZh}${site.nameEn}`;
//#endregion
//#region src/components/Icons.tsx
var base = (size) => ({
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.6,
	strokeLinecap: "round",
	strokeLinejoin: "round"
});
/** 品牌星座 Logo 图形 */
function LogoMark({ size = 34 }) {
	return /* @__PURE__ */ jsxs("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				stroke: "#38bdf8",
				strokeWidth: "1.2",
				strokeDasharray: "2.5 2.5"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "3.4",
				fill: "#38bdf8",
				opacity: "0.9"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "6.5",
				stroke: "rgba(56,189,248,0.4)",
				strokeWidth: "0.8"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M12 5.5V2.8",
				stroke: "#34e0c4",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M17.4 7.6L19.4 5.6",
				stroke: "#34e0c4",
				strokeWidth: "1"
			})
		]
	});
}
function ArrowRight({ size = 16 }) {
	return /* @__PURE__ */ jsx("svg", {
		...base(size),
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
	});
}
function SatelliteIcon({ size = 26 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "8",
				y: "2.5",
				width: "8",
				height: "5",
				rx: "1.2"
			}),
			/* @__PURE__ */ jsx("path", { d: "M10 7.5l-2.6 5.2a3 3 0 0 0 5.2 0L10 7.5z" }),
			/* @__PURE__ */ jsx("path", { d: "M12 12.8V18M8.5 17.5h7" }),
			/* @__PURE__ */ jsx("path", { d: "M6 15l-2 2M18 15l2 2" })
		]
	});
}
function GlobeIcon({ size = 26 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ jsx("path", { d: "M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3z" })]
	});
}
function RadarIcon({ size = 26 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "4.5",
				strokeOpacity: "0.5"
			}),
			/* @__PURE__ */ jsx("path", { d: "M12 12L19 5M12 12l7.5 1.5" }),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "1",
				fill: "currentColor"
			})
		]
	});
}
function BeamIcon({ size = 26 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "6.5"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("path", { d: "M12 5.5V2.5M12 21.5v-3M5.5 12h-3M21.5 12h-3" })
		]
	});
}
function ShieldIcon({ size = 26 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", { d: "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" }), /* @__PURE__ */ jsx("path", { d: "M9.5 12l2 2 3.5-4" })]
	});
}
function EcoIcon({ size = 26 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", { d: "M4 13c0-4 3-8 8-9 0 4-2 8-6 9-1 .2-2-.5-2-2z" }), /* @__PURE__ */ jsx("path", { d: "M4 21c4-1.5 9-4.5 12-9M4 17c3-1 6-3 8-5" })]
	});
}
function MailIcon({ size = 18 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("rect", {
			x: "3",
			y: "5",
			width: "18",
			height: "14",
			rx: "2"
		}), /* @__PURE__ */ jsx("path", { d: "M3 7l9 6 9-6" })]
	});
}
function PhoneIcon({ size = 18 }) {
	return /* @__PURE__ */ jsx("svg", {
		...base(size),
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" })
	});
}
function PinIcon({ size = 18 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", { d: "M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" }), /* @__PURE__ */ jsx("circle", {
			cx: "12",
			cy: "10",
			r: "2.5"
		})]
	});
}
function ClockIcon({ size = 18 }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ jsx("path", { d: "M12 7v5l3.5 2" })]
	});
}
//#endregion
//#region src/components/Navbar.tsx
/** 吸顶玻璃导航 + 移动端抽屉 */
function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const { pathname } = useLocation();
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		setOpen(false);
	}, [pathname]);
	const linkCls = ({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("header", {
		className: `nav ${scrolled ? "is-scrolled" : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container nav__inner",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "nav__brand",
					"aria-label": `${site.nameZh} 首页`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "nav__logo",
						children: /* @__PURE__ */ jsx(LogoMark, {})
					}), /* @__PURE__ */ jsxs("span", {
						className: "nav__brand-name",
						children: [/* @__PURE__ */ jsx("span", {
							className: "nav__brand-zh",
							children: site.nameZh
						}), /* @__PURE__ */ jsx("span", {
							className: "nav__brand-en",
							children: site.nameEn
						})]
					})]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "nav__links",
					"aria-label": "主导航",
					children: navItems.map((item) => /* @__PURE__ */ jsx(NavLink, {
						to: item.to,
						end: item.to === "/",
						className: linkCls,
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "nav__actions",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/contact",
						className: "btn btn--primary btn--sm",
						children: "商务合作"
					}), /* @__PURE__ */ jsxs("button", {
						className: `nav__toggle ${open ? "is-open" : ""}`,
						onClick: () => setOpen((v) => !v),
						"aria-label": open ? "关闭菜单" : "打开菜单",
						"aria-expanded": open,
						children: [
							/* @__PURE__ */ jsx("span", {}),
							/* @__PURE__ */ jsx("span", {}),
							/* @__PURE__ */ jsx("span", {})
						]
					})]
				})
			]
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: `nav__mobile ${open ? "is-open" : ""}`,
		role: "dialog",
		"aria-label": "导航菜单",
		children: [navItems.map((item) => /* @__PURE__ */ jsx(NavLink, {
			to: item.to,
			end: item.to === "/",
			className: "nav__mobile-link",
			children: item.label
		}, item.to)), /* @__PURE__ */ jsx(Link, {
			to: "/contact",
			className: "btn btn--primary nav__mobile-cta",
			children: "商务合作"
		})]
	})] });
}
//#endregion
//#region src/components/Footer.tsx
/** 全站页脚 */
function Footer() {
	const columns = [{
		title: "网站导航",
		links: navItems
	}, {
		title: "业务板块",
		links: [
			{
				to: "/constellation",
				label: "低轨星座"
			},
			{
				to: "/remote-sensing",
				label: "遥感数据"
			},
			{
				to: "/solutions",
				label: "行业解决方案"
			},
			{
				to: "/about",
				label: "关于我们"
			}
		]
	}];
	return /* @__PURE__ */ jsx("footer", {
		className: "footer",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "footer__grid",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "nav__brand",
						"aria-label": `${site.nameZh} 首页`,
						children: [/* @__PURE__ */ jsx("span", {
							className: "nav__logo",
							children: /* @__PURE__ */ jsx(LogoMark, {})
						}), /* @__PURE__ */ jsxs("span", {
							className: "nav__brand-name",
							children: [/* @__PURE__ */ jsx("span", {
								className: "nav__brand-zh",
								children: site.nameZh
							}), /* @__PURE__ */ jsx("span", {
								className: "nav__brand-en",
								children: site.nameEn
							})]
						})]
					}), /* @__PURE__ */ jsxs("p", {
						className: "footer__brand-desc",
						children: [
							site.tagline,
							"。",
							site.slogan,
							"。"
						]
					})] }),
					columns.map((col) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "footer__col-title",
						children: col.title
					}), col.links.map((l) => /* @__PURE__ */ jsx(Link, {
						to: l.to,
						className: "footer__link",
						children: l.label
					}, l.to))] }, col.title)),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h4", {
							className: "footer__col-title",
							children: "联系方式"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "footer__contact-item",
							children: [/* @__PURE__ */ jsx(PhoneIcon, { size: 16 }), /* @__PURE__ */ jsx("span", {
								className: "mono",
								children: site.phone
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "footer__contact-item",
							children: [/* @__PURE__ */ jsx(MailIcon, { size: 16 }), /* @__PURE__ */ jsx("span", {
								className: "mono",
								children: site.email
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "footer__contact-item",
							children: [/* @__PURE__ */ jsx(PinIcon, { size: 16 }), /* @__PURE__ */ jsx("span", { children: site.address })]
						})
					] })
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "footer__bottom",
				children: [/* @__PURE__ */ jsxs("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					site.nameZh,
					" · ",
					site.nameEn
				] }), /* @__PURE__ */ jsx("span", {
					className: "mono",
					children: site.icp
				})]
			})]
		})
	});
}
/** 站点根地址（不含结尾斜杠） */
var siteUrl = "http://localhost:4173".trim().replace(/\/+$/, "") || "http://localhost:4173";
/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(siteUrl);
var routeMeta = [
	{
		path: "/",
		title: "苍穹星座 CELESTRA｜低轨卫星星座运营与遥感观测服务商",
		description: "苍穹星座（CELESTRA）是商业航天企业，运营 128 颗低轨遥感卫星，提供 0.5 米分辨率卫星影像、星座运营、遥感数据与农业、林业、海洋、应急、城市治理行业解决方案。",
		keywords: "苍穹星座,CELESTRA,商业航天,低轨卫星,卫星星座,遥感卫星,卫星影像,对地观测,遥感数据服务",
		priority: "1.0",
		changefreq: "weekly"
	},
	{
		path: "/constellation",
		title: "星座运营｜128 颗低轨卫星全球组网 - 苍穹星座",
		description: "苍穹星座采用 8 轨道面、128 颗低轨卫星协同组网，轨道高度 500–800 km，激光与 Ka 星间链路全球回传，区域重访周期缩短至 1.5 小时。",
		keywords: "低轨卫星星座,卫星组网,星座运营,星间链路,全球覆盖,商业航天",
		priority: "0.9",
		changefreq: "monthly"
	},
	{
		path: "/remote-sensing",
		title: "遥感观测｜0.5 米卫星影像与多载荷对地观测 - 苍穹星座",
		description: "提供 0.5 米全色、2 米多光谱、SAR 与高光谱卫星遥感数据，120 km 幅宽，1.5 小时重访，覆盖 L1–L4 标准影像、正射、专题与应用服务。",
		keywords: "遥感观测,卫星影像,0.5米分辨率,SAR卫星,高光谱,多光谱,对地观测,遥感数据",
		priority: "0.9",
		changefreq: "monthly"
	},
	{
		path: "/solutions",
		title: "行业解决方案｜农业林业海洋应急城市治理 - 苍穹星座",
		description: "面向智慧农业、林业生态、海洋观测、应急减灾、生态环保、智慧城市六大场景，提供从卫星数据采集到决策支撑的端到端遥感解决方案。",
		keywords: "遥感解决方案,智慧农业,林业监测,海洋观测,应急减灾,生态环保,智慧城市",
		priority: "0.8",
		changefreq: "monthly"
	},
	{
		path: "/about",
		title: "关于我们｜商业航天与时空数据服务商 - 苍穹星座",
		description: "苍穹星座成立于 2018 年，专注低轨卫星星座运营与遥感对地观测，已服务 200+ 政企客户，致力于让空间信息触手可及。",
		keywords: "苍穹星座,关于我们,商业航天企业,时空数据服务商,卫星遥感公司",
		priority: "0.7",
		changefreq: "monthly"
	},
	{
		path: "/contact",
		title: "联系我们｜商务合作与遥感数据采购 - 苍穹星座",
		description: "联系苍穹星座商务团队，咨询卫星遥感数据采购、行业解决方案定制、政企合作与媒体采访。服务热线 400-000-0000，工作日 9:00–18:00。",
		keywords: "苍穹星座联系方式,遥感数据采购,卫星影像购买,商务合作,政企合作",
		priority: "0.6",
		changefreq: "yearly"
	}
];
/** 按 pathname 取页面 SEO 信息，未知路由回退首页 */
function getRouteMeta(pathname) {
	const clean = pathname.replace(/\/+$/, "") || "/";
	return routeMeta.find((item) => item.path === clean) ?? routeMeta[0];
}
/** 把站内路径拼成绝对地址（子页面使用目录式结尾，避免静态托管跳转） */
function absoluteUrl(pathname) {
	const clean = pathname.replace(/\/+$/, "");
	if (!clean || clean === "/") return `${siteUrl}/`;
	return `${siteUrl}${clean.startsWith("/") ? clean : `/${clean}`}/`;
}
//#endregion
//#region src/hooks/usePageMeta.ts
function setMeta(selector, attr, key, content) {
	let el = document.head.querySelector(selector);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}
/** 客户端路由切换时同步标题与 SEO 元信息 */
function usePageMeta(pathname) {
	useEffect(() => {
		const meta = getRouteMeta(pathname);
		const canonical = absoluteUrl(meta.path);
		document.title = meta.title;
		setMeta("meta[name=\"description\"]", "name", "description", meta.description);
		setMeta("meta[name=\"keywords\"]", "name", "keywords", meta.keywords);
		setMeta("meta[property=\"og:title\"]", "property", "og:title", meta.title);
		setMeta("meta[property=\"og:description\"]", "property", "og:description", meta.description);
		setMeta("meta[property=\"og:url\"]", "property", "og:url", canonical);
		setMeta("meta[name=\"twitter:title\"]", "name", "twitter:title", meta.title);
		setMeta("meta[name=\"twitter:description\"]", "name", "twitter:description", meta.description);
		let link = document.head.querySelector("link[rel=\"canonical\"]");
		if (!link) {
			link = document.createElement("link");
			link.rel = "canonical";
			document.head.appendChild(link);
		}
		link.href = canonical;
	}, [pathname]);
}
//#endregion
//#region src/components/Layout.tsx
/** 全站布局：导航 + 页面主体 + 页脚；路由切换时滚动到顶部 */
function Layout() {
	const { pathname } = useLocation();
	usePageMeta(pathname);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, [pathname]);
	return /* @__PURE__ */ jsxs("div", {
		className: "site",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region src/components/Starfield.tsx
/**
* Canvas 星野背景
* 星星闪烁 + 缓慢下移，密度随画布面积自适应，尊重 prefers-reduced-motion
*/
function Starfield({ density = 1, className = "" }) {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let stars = [];
		let w = 0;
		let h = 0;
		let raf = 0;
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const build = () => {
			const rect = canvas.getBoundingClientRect();
			w = Math.max(rect.width, 1);
			h = Math.max(rect.height, 1);
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.min(Math.floor(w * h / 9e3) * density, 900);
			stars = Array.from({ length: Math.max(count, 40) }, () => ({
				x: Math.random() * w,
				y: Math.random() * h,
				r: .4 + Math.random() * 1.1,
				tw: .5 + Math.random() * 2.2,
				phase: Math.random() * Math.PI * 2,
				drift: .02 + Math.random() * .06
			}));
		};
		const draw = (time) => {
			ctx.clearRect(0, 0, w, h);
			const base = time * .001;
			for (const s of stars) {
				const y = (s.y + base * s.drift) % h;
				const a = .25 + .75 * (.5 + .5 * Math.sin(base * s.tw + s.phase));
				ctx.beginPath();
				ctx.fillStyle = `rgba(220, 236, 255, ${a.toFixed(3)})`;
				ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = requestAnimationFrame(draw);
		};
		const loop = () => {
			if (reduceMotion) {
				draw(0);
				return;
			}
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(draw);
		};
		const onResize = () => {
			build();
			loop();
		};
		build();
		loop();
		window.addEventListener("resize", onResize);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", onResize);
		};
	}, [density]);
	return /* @__PURE__ */ jsx("canvas", {
		ref: canvasRef,
		className: `starfield ${className}`,
		"aria-hidden": "true"
	});
}
//#endregion
//#region src/components/OrbitVisual.tsx
/**
* SVG 轨道可视化
* 地球 + 三层虚线轨道 + 沿轨卫星（纯 CSS 旋转动画，reduced-motion 自动静止）
*/
function OrbitVisual({ className = "" }) {
	const size = 520;
	const c = size / 2;
	return /* @__PURE__ */ jsx("div", {
		className: `orbit-visual ${className}`,
		children: /* @__PURE__ */ jsxs("svg", {
			viewBox: `0 0 ${size} ${size}`,
			role: "img",
			"aria-label": "星座轨道示意",
			children: [
				/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("radialGradient", {
					id: "earth-grad",
					cx: "40%",
					cy: "35%",
					r: "75%",
					children: [
						/* @__PURE__ */ jsx("stop", {
							offset: "0%",
							stopColor: "#3d82e6"
						}),
						/* @__PURE__ */ jsx("stop", {
							offset: "55%",
							stopColor: "#1b3d73"
						}),
						/* @__PURE__ */ jsx("stop", {
							offset: "100%",
							stopColor: "#0a1a38"
						})
					]
				}), /* @__PURE__ */ jsxs("radialGradient", {
					id: "orbit-glow",
					cx: "50%",
					cy: "50%",
					r: "50%",
					children: [/* @__PURE__ */ jsx("stop", {
						offset: "0%",
						stopColor: "rgba(56,189,248,0.16)"
					}), /* @__PURE__ */ jsx("stop", {
						offset: "100%",
						stopColor: "rgba(56,189,248,0)"
					})]
				})] }),
				/* @__PURE__ */ jsx("circle", {
					cx: c,
					cy: c,
					r: 245,
					fill: "url(#orbit-glow)"
				}),
				[
					{
						r: 150,
						dur: 22,
						size: 5,
						cls: "ring--inner"
					},
					{
						r: 200,
						dur: 32,
						size: 6,
						cls: "ring--sat"
					},
					{
						r: 248,
						dur: 46,
						size: 7,
						cls: ""
					}
				].map((ring) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("circle", {
					className: `ring ${ring.cls}`,
					cx: c,
					cy: c,
					r: ring.r
				}), /* @__PURE__ */ jsx("g", {
					className: "sat",
					style: { animationDuration: `${ring.dur}s` },
					children: /* @__PURE__ */ jsxs("g", {
						style: { transform: `translate(${ring.r}px, 0)` },
						children: [/* @__PURE__ */ jsx("circle", {
							className: "sat-glow",
							cx: c,
							cy: c,
							r: ring.size * 2.6,
							fill: "rgba(56,189,248,0.14)"
						}), /* @__PURE__ */ jsx("circle", {
							className: "sat-dot",
							cx: c,
							cy: c,
							r: ring.size
						})]
					})
				})] }, ring.r)),
				/* @__PURE__ */ jsx("circle", {
					className: "earth",
					cx: c,
					cy: c,
					r: 96
				}),
				/* @__PURE__ */ jsxs("g", {
					fill: "none",
					stroke: "rgba(148,180,240,0.28)",
					strokeWidth: "0.8",
					children: [
						/* @__PURE__ */ jsx("ellipse", {
							cx: c,
							cy: c,
							rx: 96,
							ry: 34
						}),
						/* @__PURE__ */ jsx("ellipse", {
							cx: c,
							cy: c,
							rx: 34,
							ry: 96
						}),
						/* @__PURE__ */ jsx("line", {
							x1: 164,
							y1: c,
							x2: 356,
							y2: c
						}),
						/* @__PURE__ */ jsx("line", {
							x1: c,
							y1: 164,
							x2: c,
							y2: c
						})
					]
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: 230,
					cy: 238,
					r: 3.2,
					fill: "rgba(52,224,196,0.9)"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: 298,
					cy: 286,
					r: 2.6,
					fill: "rgba(52,224,196,0.7)"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: 272,
					cy: 220,
					r: 2.2,
					fill: "rgba(52,224,196,0.55)"
				})
			]
		})
	});
}
//#endregion
//#region src/components/HudFrame.tsx
/** HUD 直角括号角框 + 扫描线，包裹任意内容营造科技感取景框 */
function HudFrame({ children, className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `hud-frame ${className}`,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "hud-frame__corner hud-frame__corner--tl",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "hud-frame__corner hud-frame__corner--tr",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "hud-frame__corner hud-frame__corner--bl",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "hud-frame__corner hud-frame__corner--br",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "scanline",
				"aria-hidden": "true"
			}),
			children
		]
	});
}
//#endregion
//#region src/components/Reveal.tsx
/** 滚动浮现容器：进入视口后渐显上浮，支持错峰延迟 */
function Reveal({ children, delay = 0, className = "" }) {
	const ref = useRef(null);
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setInView(true);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setInView(true);
				io.disconnect();
			}
		}, { threshold: .12 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: `reveal ${inView ? "is-in" : ""} ${className}`,
		style: { "--reveal-delay": `${delay}ms` },
		children
	});
}
//#endregion
//#region src/components/SectionTitle.tsx
/** 区块标题：等宽标签 + 大标题 + 描述 */
function SectionTitle({ tag, title, desc, center = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `section-head ${center ? "section-head--center" : ""}`,
		children: [
			tag && /* @__PURE__ */ jsx("div", {
				className: "section-head__tag",
				children: tag
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "section-head__title",
				children: title
			}),
			desc && /* @__PURE__ */ jsx("p", {
				className: "section-head__desc",
				children: desc
			})
		]
	});
}
//#endregion
//#region src/components/DataCard.tsx
/** 能力卡片：图标 + 标题 + 描述 + 要点 + 跳转链接 */
function DataCard({ icon, title, desc, points, to }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "card",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "card__icon",
				children: icon
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "card__title",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "card__desc",
				children: desc
			}),
			points && /* @__PURE__ */ jsx("ul", {
				style: {
					marginTop: 18,
					display: "grid",
					gap: 8
				},
				children: points.map((p) => /* @__PURE__ */ jsxs("li", {
					style: {
						display: "flex",
						gap: 10,
						color: "var(--text-mid)",
						fontSize: 14
					},
					children: [/* @__PURE__ */ jsx("span", {
						style: {
							color: "var(--data)",
							fontFamily: "var(--font-mono)"
						},
						children: "▸"
					}), p]
				}, p))
			}),
			to && /* @__PURE__ */ jsxs(Link, {
				to,
				className: "card__link",
				children: ["了解更多 ", /* @__PURE__ */ jsx(ArrowRight, {})]
			})
		]
	});
}
//#endregion
//#region src/components/Counter.tsx
/** 数字计数器：进入视口后缓动递增至目标值 */
function Counter({ value, decimals = 0, duration = 1800 }) {
	const [display, setDisplay] = useState(value);
	const ref = useRef(null);
	const started = useRef(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduce) return;
		setDisplay(0);
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !started.current) {
				started.current = true;
				io.disconnect();
				if (reduce) {
					setDisplay(value);
					return;
				}
				const t0 = performance.now();
				const tick = (t) => {
					const p = Math.min((t - t0) / duration, 1);
					const eased = 1 - Math.pow(1 - p, 3);
					setDisplay(value * eased);
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			}
		}, { threshold: .5 });
		io.observe(el);
		return () => io.disconnect();
	}, [value, duration]);
	const formatted = display.toLocaleString("zh-CN", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
	return /* @__PURE__ */ jsx("span", {
		ref,
		children: formatted
	});
}
//#endregion
//#region src/components/StatBand.tsx
/** 数据看板：四组动画计数指标 */
function StatBand({ items }) {
	return /* @__PURE__ */ jsx("div", {
		className: "stat-band",
		children: items.map((s) => /* @__PURE__ */ jsxs("div", {
			className: "stat",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "stat__num",
				children: [/* @__PURE__ */ jsx(Counter, {
					value: s.value,
					decimals: s.decimals ?? 0
				}), s.unit && /* @__PURE__ */ jsx("span", {
					className: "stat__unit",
					children: s.unit
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "stat__label",
				children: s.label
			})]
		}, s.label))
	});
}
//#endregion
//#region src/components/SolutionCard.tsx
/** 行业解决方案卡：编号 + 标题 + 描述 + 能力标签 */
function SolutionCard({ num, title, desc, tags }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "card solution-card",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "solution-card__head",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "solution-card__num",
					children: ["S-", num]
				}), /* @__PURE__ */ jsx("h3", {
					className: "solution-card__title",
					children: title
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "card__desc",
				children: desc
			}),
			/* @__PURE__ */ jsx("div", {
				className: "solution-card__tags",
				children: tags.map((t) => /* @__PURE__ */ jsx("span", {
					className: "tag",
					children: t
				}, t))
			})
		]
	});
}
//#endregion
//#region src/components/NewsCard.tsx
/** 新闻卡片：日期 + 标题 + 摘要 */
function NewsCard({ date, title, desc }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "card news-card",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "news-card__date",
				children: date
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "news-card__title",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "news-card__desc",
				children: desc
			})
		]
	});
}
//#endregion
//#region src/pages/Home.tsx
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "hero",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "hero__starfield",
					children: /* @__PURE__ */ jsx(Starfield, {})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hero__grid-overlay",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "container",
					children: /* @__PURE__ */ jsxs("div", {
						className: "hero__content",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("span", {
								className: "hero__eyebrow",
								children: homeHero.eyebrow
							}) }),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 90,
								children: /* @__PURE__ */ jsxs("h1", {
									className: "hero__title",
									children: [
										homeHero.titleTop,
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("span", {
											className: "grad-text",
											children: homeHero.titleAccent
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 170,
								children: /* @__PURE__ */ jsx("p", {
									className: "hero__sub",
									children: homeHero.sub
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 250,
								children: /* @__PURE__ */ jsxs("div", {
									className: "hero__cta",
									children: [/* @__PURE__ */ jsx(Link, {
										to: "/constellation",
										className: "btn btn--primary",
										children: homeHero.ctaPrimary
									}), /* @__PURE__ */ jsx(Link, {
										to: "/remote-sensing",
										className: "btn btn--ghost",
										children: homeHero.ctaSecondary
									})]
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 330,
								children: /* @__PURE__ */ jsx("div", {
									className: "hero__hud-tags",
									children: homeHero.hudTags.map((t) => /* @__PURE__ */ jsx("span", {
										className: "pill",
										children: t
									}, t))
								})
							})
						] }), /* @__PURE__ */ jsx(Reveal, {
							delay: 180,
							className: "hero__visual",
							children: /* @__PURE__ */ jsx(HudFrame, { children: /* @__PURE__ */ jsx(OrbitVisual, {}) })
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "CORE CAPABILITIES",
					title: "空天地一体化核心能力",
					desc: "从星座研制运营到数据服务，两大业务支柱协同，构建端到端的空间信息能力。"
				}) }), /* @__PURE__ */ jsx("div", {
					className: "grid grid-2",
					children: homeCapabilities.map((c, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 140,
						className: "grid-item",
						children: /* @__PURE__ */ jsx(DataCard, {
							icon: c.key === "constellation" ? /* @__PURE__ */ jsx(SatelliteIcon, { size: 26 }) : /* @__PURE__ */ jsx(GlobeIcon, { size: 26 }),
							title: c.title,
							desc: c.desc,
							points: c.points,
							to: c.to
						})
					}, c.key))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section section--tight",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "LIVE TELEMETRY",
					title: "在轨实时数据看板",
					desc: "128 颗卫星构成全球感知网络，数据持续回传，能力实时可查。",
					center: true
				}) }), /* @__PURE__ */ jsx(Reveal, {
					delay: 140,
					children: /* @__PURE__ */ jsx(StatBand, { items: stats })
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [
					/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
						tag: "INDUSTRY SOLUTIONS",
						title: "行业解决方案",
						desc: "围绕行业真实需求打磨，从数据到决策，一站式交付。"
					}) }),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-2",
						style: { gap: 20 },
						children: homeSolutions.map((s, i) => /* @__PURE__ */ jsx(Reveal, {
							delay: i * 110,
							className: "grid-item",
							children: /* @__PURE__ */ jsx(SolutionCard, {
								num: s.num,
								title: s.title,
								desc: s.desc,
								tags: s.tags
							})
						}, s.key))
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 120,
						children: /* @__PURE__ */ jsx("div", {
							style: {
								marginTop: 40,
								textAlign: "center"
							},
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/solutions",
								className: "btn btn--ghost",
								children: ["查看全部解决方案 ", /* @__PURE__ */ jsx(ArrowRight, {})]
							})
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section section--tight",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "NEWS & UPDATES",
					title: "公司动态"
				}) }), /* @__PURE__ */ jsx("div", {
					className: "grid grid-3",
					children: homeNews.map((n, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 120,
						className: "grid-item",
						children: /* @__PURE__ */ jsx(NewsCard, {
							date: n.date,
							title: n.title,
							desc: n.desc
						})
					}, n.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section section--tight",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
					className: "cta-band",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "cta-band__title",
							children: "让每一次观测，都产生价值"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "cta-band__desc",
							children: "无论是政企合作、行业定制，还是数据采购，我们的技术团队随时为您提供专业方案。"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "cta-band__actions",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "btn btn--primary",
								children: "联系我们"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/about",
								className: "btn btn--ghost",
								children: "了解我们"
							})]
						})
					]
				}) })
			})
		})
	] });
}
//#endregion
//#region src/components/PageHero.tsx
/** 内页共用 Hero：面包屑 + 标题 + 副标题 + 元数据 */
function PageHero({ crumb, title, sub, meta }) {
	return /* @__PURE__ */ jsxs("header", {
		className: "page-hero",
		children: [/* @__PURE__ */ jsx("div", {
			className: "page-hero__starfield",
			children: /* @__PURE__ */ jsx(Starfield, { density: .55 })
		}), /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [
				/* @__PURE__ */ jsxs("nav", {
					className: "page-hero__crumb",
					"aria-label": "面包屑",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							children: "首页"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "sep",
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", { children: crumb })
					]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "page-hero__title",
					children: title
				}),
				sub && /* @__PURE__ */ jsx("p", {
					className: "page-hero__sub",
					children: sub
				}),
				meta && /* @__PURE__ */ jsx("div", {
					className: "page-hero__meta",
					children: meta.map((m) => /* @__PURE__ */ jsxs("div", {
						className: "page-hero__meta-item",
						children: [/* @__PURE__ */ jsx("span", {
							className: "page-hero__meta-label",
							children: m.label
						}), /* @__PURE__ */ jsx("span", {
							className: "page-hero__meta-value",
							children: m.value
						})]
					}, m.label))
				})
			]
		})]
	});
}
//#endregion
//#region src/components/SpecTable.tsx
/** 参数表：两列（名称 / 值） */
function SpecTable({ rows, title }) {
	return /* @__PURE__ */ jsxs("table", {
		className: "spec-table",
		children: [title && /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("th", {
			colSpan: 2,
			children: title
		}) }) }), /* @__PURE__ */ jsx("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", { children: row.name }), /* @__PURE__ */ jsx("td", { children: row.value })] }, row.name)) })]
	});
}
//#endregion
//#region src/pages/Constellation.tsx
var advIcons = {
	coverage: /* @__PURE__ */ jsx(GlobeIcon, { size: 26 }),
	revisit: /* @__PURE__ */ jsx(RadarIcon, { size: 26 }),
	link: /* @__PURE__ */ jsx(SatelliteIcon, { size: 26 }),
	ops: /* @__PURE__ */ jsx(ShieldIcon, { size: 26 })
};
function Constellation() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			crumb: constellationHero.crumb,
			title: constellationHero.title,
			sub: constellationHero.sub,
			meta: constellationHero.meta
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-2",
					style: {
						alignItems: "center",
						gap: 60
					},
					children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "pill",
							children: "WALKER CONSTELLATION"
						}),
						/* @__PURE__ */ jsxs("h2", {
							style: {
								fontSize: "clamp(24px, 3vw, 34px)",
								fontWeight: 800,
								marginTop: 20
							},
							children: [
								"8 轨道面 · 128 颗卫星",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "grad-text",
									children: "协同组网全球覆盖"
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							style: {
								marginTop: 18,
								color: "var(--text-mid)",
								fontSize: 16
							},
							children: constellationHero.sub
						}),
						/* @__PURE__ */ jsx("ul", {
							style: {
								marginTop: 26,
								display: "grid",
								gap: 12
							},
							children: [
								"轨道面均匀分布，任意区域均可规划成像",
								"激光星间链路，天基中继全球回传",
								"自动化在轨管理，全生命周期数字孪生"
							].map((p) => /* @__PURE__ */ jsxs("li", {
								style: {
									display: "flex",
									gap: 12,
									alignItems: "flex-start",
									color: "var(--text-mid)",
									fontSize: 15
								},
								children: [/* @__PURE__ */ jsx("span", {
									style: {
										color: "var(--data)",
										fontFamily: "var(--font-mono)",
										lineHeight: 1.6
									},
									children: "▸"
								}), p]
							}, p))
						}),
						/* @__PURE__ */ jsx("div", {
							style: { marginTop: 32 },
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/remote-sensing",
								className: "btn btn--primary",
								children: ["查看观测能力 ", /* @__PURE__ */ jsx(ArrowRight, {})]
							})
						})
					] }) }), /* @__PURE__ */ jsx(Reveal, {
						delay: 140,
						children: /* @__PURE__ */ jsx(HudFrame, { children: /* @__PURE__ */ jsx(OrbitVisual, {}) })
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section section--tight",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "CONSTELLATION SPEC",
					title: "星座技术参数",
					desc: "面向工程交付的核心参数，均已在轨实测验证。"
				}) }), /* @__PURE__ */ jsx(Reveal, {
					delay: 120,
					children: /* @__PURE__ */ jsx(SpecTable, {
						rows: constellationParams,
						title: "苍穹星座 · 轨道与组网参数"
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "COMPETITIVE EDGE",
					title: "星座核心优势"
				}) }), /* @__PURE__ */ jsx("div", {
					className: "grid grid-2",
					style: { gap: 20 },
					children: constellationAdvantages.map((a, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 110,
						className: "grid-item",
						children: /* @__PURE__ */ jsxs("article", {
							className: "card",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "card__icon",
									children: advIcons[a.key]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "card__title",
									children: a.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "card__desc",
									children: a.desc
								})
							]
						})
					}, a.key))
				})]
			})
		})
	] });
}
//#endregion
//#region src/pages/RemoteSensing.tsx
var payloadIcons = {
	optical: /* @__PURE__ */ jsx(BeamIcon, { size: 26 }),
	sar: /* @__PURE__ */ jsx(RadarIcon, { size: 26 }),
	hyper: /* @__PURE__ */ jsx(GlobeIcon, { size: 26 }),
	multi: /* @__PURE__ */ jsx(SatelliteIcon, { size: 26 })
};
var sensingSpecs = [
	{
		name: "全色分辨率",
		value: "0.5 m"
	},
	{
		name: "多光谱分辨率",
		value: "2 m"
	},
	{
		name: "高光谱谱段数",
		value: "200+ 谱段"
	},
	{
		name: "成像幅宽",
		value: "120 km"
	},
	{
		name: "重访周期",
		value: "1.5 小时（区域）"
	},
	{
		name: "数据回传时延",
		value: "≤ 30 分钟"
	}
];
function RemoteSensing() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			crumb: sensingHero.crumb,
			title: sensingHero.title,
			sub: sensingHero.sub,
			meta: sensingHero.meta
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section section--tight",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(StatBand, { items: stats }) })
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "PAYLOADS",
					title: "四类载荷协同观测",
					desc: "光学、SAR、高光谱、多光谱并行组网，全天时全天候覆盖。"
				}) }), /* @__PURE__ */ jsx("div", {
					className: "grid grid-4",
					children: sensingPayloads.map((p, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 100,
						className: "grid-item",
						children: /* @__PURE__ */ jsxs("article", {
							className: "card",
							style: { height: "100%" },
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "card__icon",
									children: payloadIcons[p.key]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "card__title",
									children: p.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "card__desc",
									children: p.desc
								})
							]
						})
					}, p.key))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section section--tight",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-2",
					style: {
						gap: 48,
						alignItems: "start"
					},
					children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(SectionTitle, {
						tag: "SPEC SHEET",
						title: "核心技术指标",
						desc: "指标均为在轨实测数据，可提供验证样例影像。"
					}), /* @__PURE__ */ jsx(SpecTable, {
						rows: sensingSpecs,
						title: "遥感载荷 · 指标"
					})] }), /* @__PURE__ */ jsxs(Reveal, {
						delay: 140,
						children: [/* @__PURE__ */ jsx(SectionTitle, {
							tag: "DATA PRODUCTS",
							title: "数据产品体系",
							desc: "从标准影像到专题服务，按需选择，开箱即用。"
						}), /* @__PURE__ */ jsx("div", {
							style: {
								display: "grid",
								gap: 16
							},
							children: sensingProducts.map((prod) => /* @__PURE__ */ jsxs("div", {
								className: "card",
								style: {
									padding: "22px 26px",
									display: "flex",
									gap: 20,
									alignItems: "flex-start"
								},
								children: [/* @__PURE__ */ jsx("span", {
									className: "mono",
									style: {
										flexShrink: 0,
										fontSize: 13,
										color: "var(--accent)",
										background: "rgba(139,92,246,0.12)",
										border: "1px solid rgba(139,92,246,0.3)",
										borderRadius: 8,
										padding: "6px 12px",
										letterSpacing: "0.1em"
									},
									children: prod.level
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									style: { fontSize: 16 },
									children: prod.name
								}), /* @__PURE__ */ jsx("p", {
									className: "card__desc",
									style: { marginTop: 4 },
									children: prod.desc
								})] })]
							}, prod.level))
						})]
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "APPLICATIONS",
					title: "典型应用场景",
					desc: "面向六大赛道提供端到端数据服务，点击查看解决方案详情。",
					center: true
				}) }), /* @__PURE__ */ jsx(Reveal, {
					delay: 120,
					children: /* @__PURE__ */ jsx("div", {
						style: { textAlign: "center" },
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/solutions",
							className: "btn btn--primary",
							children: ["查看行业解决方案 ", /* @__PURE__ */ jsx(ArrowRight, {})]
						})
					})
				})]
			})
		})
	] });
}
//#endregion
//#region src/pages/Solutions.tsx
function Solutions() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			crumb: "解决方案",
			title: "六大行业 · 场景化解决方案",
			sub: "围绕农业、林业、海洋、应急、环保、城市治理的真实业务需求，提供从数据采集到决策支撑的端到端服务。",
			meta: [
				{
					label: "覆盖行业",
					value: "6 大行业"
				},
				{
					label: "服务模式",
					value: "端到端交付"
				},
				{
					label: "响应周期",
					value: "小时级"
				}
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "SOLUTION PORTFOLIO",
					title: "全行业解决方案矩阵",
					desc: "每一项方案均经过真实项目验证，可提供案例数据与交付样例。"
				}) }), /* @__PURE__ */ jsx("div", {
					className: "grid grid-3",
					children: solutions.map((s, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i % 3 * 110,
						className: "grid-item",
						children: /* @__PURE__ */ jsx(SolutionCard, {
							num: s.num,
							title: s.title,
							desc: s.desc,
							tags: s.tags
						})
					}, s.num))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section section--tight",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
					className: "cta-band",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "cta-band__title",
							children: "找不到匹配的场景？我们为您定制"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "cta-band__desc",
							children: "告诉我们您的业务目标，技术团队将基于星座与数据能力，为您设计专属解决方案。"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "cta-band__actions",
							children: [/* @__PURE__ */ jsxs(Link, {
								to: "/contact",
								className: "btn btn--primary",
								children: ["预约方案咨询 ", /* @__PURE__ */ jsx(ArrowRight, {})]
							}), /* @__PURE__ */ jsx(Link, {
								to: "/remote-sensing",
								className: "btn btn--ghost",
								children: "查看数据能力"
							})]
						})
					]
				}) })
			})
		})
	] });
}
//#endregion
//#region src/pages/About.tsx
var qualIcons = {
	cert: /* @__PURE__ */ jsx(ShieldIcon, { size: 26 }),
	team: /* @__PURE__ */ jsx(SatelliteIcon, { size: 26 }),
	partner: /* @__PURE__ */ jsx(EcoIcon, { size: 26 })
};
function About() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			crumb: "关于我们",
			title: `关于${site.nameZh}`,
			sub: "一家专注于低轨星座运营与遥感对地观测的商业航天企业，让空间信息触手可及。",
			meta: [
				{
					label: "成立时间",
					value: "2018"
				},
				{
					label: "在轨卫星",
					value: "128 颗"
				},
				{
					label: "服务客户",
					value: "200+"
				}
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-2",
					style: {
						gap: 60,
						alignItems: "start"
					},
					children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "pill",
							children: "WHO WE ARE"
						}),
						/* @__PURE__ */ jsx("h2", {
							style: {
								fontSize: "clamp(24px, 3vw, 34px)",
								fontWeight: 800,
								marginTop: 20
							},
							children: aboutIntro.title
						}),
						aboutIntro.paras.map((p) => /* @__PURE__ */ jsx("p", {
							style: {
								marginTop: 18,
								color: "var(--text-mid)",
								fontSize: 16
							},
							children: p
						}, p.slice(0, 12)))
					] }) }), /* @__PURE__ */ jsx(Reveal, {
						delay: 140,
						children: /* @__PURE__ */ jsxs("div", {
							className: "card",
							style: { padding: "34px 32px" },
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "mono",
									style: {
										fontSize: 13,
										color: "var(--accent)",
										letterSpacing: "0.14em"
									},
									children: "OUR VISION"
								}),
								/* @__PURE__ */ jsxs("p", {
									style: {
										marginTop: 18,
										fontSize: "clamp(20px, 2.4vw, 26px)",
										fontWeight: 700,
										lineHeight: 1.5
									},
									children: [
										"「",
										aboutIntro.vision,
										"」"
									]
								}),
								/* @__PURE__ */ jsx("div", {
									style: {
										marginTop: 24,
										borderTop: "1px solid var(--line)",
										paddingTop: 20
									},
									children: /* @__PURE__ */ jsxs("span", {
										className: "mono",
										style: {
											fontSize: 13,
											color: "var(--text-low)",
											letterSpacing: "0.14em"
										},
										children: [
											site.nameEn,
											" · ",
											site.nameZh
										]
									})
								})
							]
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, {
					tag: "MILESTONES",
					title: "发展里程碑",
					desc: "从一纸蓝图到全球组网，每一步都算数。"
				}) }), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-2",
					style: { gap: 60 },
					children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", {
						className: "timeline",
						children: milestones.map((m) => /* @__PURE__ */ jsxs("div", {
							className: "timeline__item",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "timeline__dot",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "timeline__year",
									children: m.year
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "timeline__title",
									children: m.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "timeline__desc",
									children: m.desc
								})
							]
						}, m.year))
					}) }), /* @__PURE__ */ jsxs(Reveal, {
						delay: 140,
						children: [/* @__PURE__ */ jsx(SectionTitle, {
							tag: "STRENGTHS",
							title: "资质与团队"
						}), /* @__PURE__ */ jsx("div", {
							style: {
								display: "grid",
								gap: 20
							},
							children: qualifications.map((q) => /* @__PURE__ */ jsxs("article", {
								className: "card",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "card__icon",
										children: qualIcons[q.key]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "card__title",
										children: q.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "card__desc",
										children: q.desc
									})
								]
							}, q.key))
						})]
					})]
				})]
			})
		})
	] });
}
//#endregion
//#region src/pages/Contact.tsx
var methodIcons = [
	/* @__PURE__ */ jsx(PhoneIcon, { size: 18 }, "p"),
	/* @__PURE__ */ jsx(MailIcon, { size: 18 }, "m"),
	/* @__PURE__ */ jsx(PinIcon, { size: 18 }, "l")
];
function Contact() {
	const [submitted, setSubmitted] = useState(false);
	const onSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageHero, {
		crumb: "联系我们",
		title: "与我们一起，观测世界",
		sub: "无论是商务合作、行业定制还是数据采购，欢迎随时联系我们的技术团队。"
	}), /* @__PURE__ */ jsx("section", {
		className: "section",
		children: /* @__PURE__ */ jsx("div", {
			className: "container",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-2",
				style: {
					gap: 48,
					alignItems: "start"
				},
				children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(SectionTitle, {
					tag: "GET IN TOUCH",
					title: "在线留言",
					desc: "提交后 1 个工作日内回复。"
				}), submitted ? /* @__PURE__ */ jsxs("div", {
					className: "cta-band",
					style: {
						textAlign: "left",
						padding: "40px 36px"
					},
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mono",
							style: {
								color: "var(--data)",
								fontSize: 14,
								letterSpacing: "0.1em"
							},
							children: "MESSAGE RECEIVED"
						}),
						/* @__PURE__ */ jsx("h3", {
							style: {
								marginTop: 14,
								fontSize: 22
							},
							children: "留言已收到"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "card__desc",
							style: { marginTop: 10 },
							children: "感谢您的信任，我们的商务团队将尽快与您取得联系。"
						})
					]
				}) : /* @__PURE__ */ jsxs("form", {
					className: "form",
					onSubmit,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "form__row",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "form__field",
								children: [/* @__PURE__ */ jsxs("label", {
									className: "form__label",
									htmlFor: "name",
									children: ["您的姓名 ", /* @__PURE__ */ jsx("span", { children: "*" })]
								}), /* @__PURE__ */ jsx("input", {
									id: "name",
									name: "name",
									className: "form__input",
									required: true,
									placeholder: "张三"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "form__field",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form__label",
									htmlFor: "company",
									children: "单位名称"
								}), /* @__PURE__ */ jsx("input", {
									id: "company",
									name: "company",
									className: "form__input",
									placeholder: "××× 科技有限公司"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "form__field",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "form__label",
								htmlFor: "contact",
								children: ["联系方式 ", /* @__PURE__ */ jsx("span", { children: "*" })]
							}), /* @__PURE__ */ jsx("input", {
								id: "contact",
								name: "contact",
								className: "form__input",
								required: true,
								placeholder: "手机号或邮箱"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "form__field",
							children: [/* @__PURE__ */ jsx("label", {
								className: "form__label",
								htmlFor: "topic",
								children: "合作意向"
							}), /* @__PURE__ */ jsx("input", {
								id: "topic",
								name: "topic",
								className: "form__input",
								placeholder: "如：智慧农业数据采购"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "form__field",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "form__label",
								htmlFor: "message",
								children: ["留言内容 ", /* @__PURE__ */ jsx("span", { children: "*" })]
							}), /* @__PURE__ */ jsx("textarea", {
								id: "message",
								name: "message",
								className: "form__textarea",
								rows: 5,
								required: true,
								placeholder: "请简要描述您的需求"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "btn btn--primary",
							style: { justifySelf: "start" },
							children: "提交留言"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "form__hint",
							children: "我们承诺严格保护您的隐私，仅用于本次业务对接。"
						})
					]
				})] }), /* @__PURE__ */ jsxs(Reveal, {
					delay: 140,
					children: [/* @__PURE__ */ jsx(SectionTitle, {
						tag: "CONTACT INFO",
						title: "联系方式"
					}), /* @__PURE__ */ jsxs("div", {
						style: {
							display: "grid",
							gap: 20
						},
						children: [
							contactMethods.map((m, i) => /* @__PURE__ */ jsxs("div", {
								className: "card",
								style: {
									display: "flex",
									gap: 18,
									alignItems: "flex-start",
									padding: "24px 26px"
								},
								children: [/* @__PURE__ */ jsx("div", {
									className: "card__icon",
									style: {
										marginBottom: 0,
										flexShrink: 0
									},
									children: methodIcons[i]
								}), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("h3", {
										style: { fontSize: 15 },
										children: m.label
									}),
									/* @__PURE__ */ jsx("p", {
										className: m.mono ? "mono" : "",
										style: {
											marginTop: 6,
											fontSize: 16,
											color: "var(--text-hi)"
										},
										children: m.value
									}),
									/* @__PURE__ */ jsx("p", {
										className: "card__desc",
										style: { marginTop: 4 },
										children: m.hint
									})
								] })]
							}, m.label)),
							/* @__PURE__ */ jsxs("div", {
								className: "card",
								style: {
									display: "flex",
									gap: 18,
									alignItems: "flex-start",
									padding: "24px 26px"
								},
								children: [/* @__PURE__ */ jsx("div", {
									className: "card__icon",
									style: {
										marginBottom: 0,
										flexShrink: 0
									},
									children: /* @__PURE__ */ jsx(ClockIcon, { size: 18 })
								}), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("h3", {
										style: { fontSize: 15 },
										children: "服务时间"
									}),
									/* @__PURE__ */ jsx("p", {
										style: {
											marginTop: 6,
											fontSize: 15,
											color: "var(--text-hi)"
										},
										children: site.hours
									}),
									/* @__PURE__ */ jsx("p", {
										className: "card__desc",
										style: { marginTop: 4 },
										children: "紧急需求可拨打热线，全年 7×24 响应"
									})
								] })]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "card",
								style: { padding: "22px 26px" },
								children: /* @__PURE__ */ jsxs("p", {
									className: "card__desc",
									children: ["总部地址：", /* @__PURE__ */ jsx("span", {
										style: { color: "var(--text-hi)" },
										children: site.address
									})]
								})
							})
						]
					})]
				})]
			})
		})
	})] });
}
//#endregion
//#region src/AppRoutes.tsx
/** 路由表：浏览器端与预渲染端共用 */
function AppRoutes() {
	return /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, {
		element: /* @__PURE__ */ jsx(Layout, {}),
		children: [
			/* @__PURE__ */ jsx(Route, {
				index: true,
				element: /* @__PURE__ */ jsx(Home, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "constellation",
				element: /* @__PURE__ */ jsx(Constellation, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "remote-sensing",
				element: /* @__PURE__ */ jsx(RemoteSensing, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "solutions",
				element: /* @__PURE__ */ jsx(Solutions, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "about",
				element: /* @__PURE__ */ jsx(About, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "contact",
				element: /* @__PURE__ */ jsx(Contact, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "*",
				element: /* @__PURE__ */ jsx(Home, {})
			})
		]
	}) });
}
//#endregion
//#region src/entry-server.tsx
/** 子路径部署时的 basename（本地构建为空字符串） */
var basePath = "";
/** 预渲染单个路径的 HTML（构建时使用） */
function render(url) {
	return renderToString(/* @__PURE__ */ jsx(StaticRouter, {
		location: url,
		basename: void 0,
		children: /* @__PURE__ */ jsx(AppRoutes, {})
	}));
}
/** 生成页面级 SEO 数据，供预渲染脚本注入 <head> */
function pageSeo(url) {
	const meta = getRouteMeta(url);
	const canonical = absoluteUrl(meta.path);
	const image = `${siteUrl}/og-cover.png`;
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${siteUrl}/#organization`,
				name: site.nameZh,
				alternateName: site.nameEn,
				url: `${siteUrl}/`,
				logo: `${siteUrl}/favicon.svg`,
				image,
				description: site.tagline,
				slogan: site.slogan,
				telephone: site.phone,
				email: site.email,
				address: {
					"@type": "PostalAddress",
					addressCountry: "CN",
					addressRegion: "北京市",
					addressLocality: "北京市",
					streetAddress: site.address
				},
				contactPoint: {
					"@type": "ContactPoint",
					telephone: site.phone,
					email: site.email,
					contactType: "sales",
					areaServed: "CN",
					availableLanguage: ["zh-CN"]
				}
			},
			{
				"@type": "WebSite",
				"@id": `${siteUrl}/#website`,
				url: `${siteUrl}/`,
				name: `${site.nameZh} · ${site.nameEn}`,
				description: site.tagline,
				inLanguage: "zh-CN",
				publisher: { "@id": `${siteUrl}/#organization` }
			},
			{
				"@type": "WebPage",
				"@id": `${canonical}#webpage`,
				url: canonical,
				name: meta.title,
				description: meta.description,
				inLanguage: "zh-CN",
				isPartOf: { "@id": `${siteUrl}/#website` },
				about: { "@id": `${siteUrl}/#organization` }
			}
		]
	};
	return {
		...meta,
		canonical,
		image,
		jsonLd: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
	};
}
//#endregion
export { basePath, pageSeo, render, routeMeta, site, siteUrl };
