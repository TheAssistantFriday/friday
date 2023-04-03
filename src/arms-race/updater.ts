import {
    ArmsRace,
    ArmsRaceGroup,
    ArmsRaceMap,
    ArmsRaceSchedule,
    ArmsRaceTemplate,
    ArmsRaceTemplateGroup
} from './model'
import { db } from '../firebase/firebase'

const enArmsRaces: Array<ArmsRace> = [
    {
        theme: 'Interstellar Trade',
        name: 'Interstellar Trade',
        tasks: [
            'Gather resources: Wood, Stone, Electricity, Amethyst, Gold',
            'Collect materials: Plastic, Graphite, Steel',
            'Complete Mars Mart orders',
            'Complete Trade Fair orders'
        ],
    },
    {
        theme: 'Army Expansion',
        name: 'Army Expansion',
        tasks: [
            'Train troops: Tank, Infantry, Aircraft',
            'Complete radar tasks',
            'Kill pirates',
            'Rally sandworms',
            'Use train speed-up items'
        ]
    },
    {
        theme: 'Hero Initiative',
        name: 'Hero Initiative',
        tasks: [
            'Recruit heroes'
        ]
    },
    {
        theme: 'Base Expansion',
        name: 'Base Expansion',
        tasks: [
            'Increase structure CP',
            'Consume Data Chip, Citrine, Emerald, and Sapphire',
            'Use building upgrade speed-up items'
        ]
    },
    {
        theme: 'Age of Science',
        name: 'Age of Science',
        tasks: [
            'Increase technology CP',
            'Use Gears',
            'Use research speed-up items'
        ]
    }
]

const thArmsRaces: Array<ArmsRace> = [
    {
        theme: 'Interstellar Trade',
        name: 'ค้าขายอวกาศ',
        tasks: [
            'รวบรวมทรัพยากร : ไม้ หิน ไฟฟ้า อเมทิสต์ ทอง',
            'รวบรวมวัสดุ : พลาสติก กราไฟต์ เหล็ก',
            'ส่งออเดอร์จรวดการค้า',
            'ส่งออเดอร์ในมหกรรมการค้า',
        ]
    },
    {
        theme: 'Army Expansion',
        name: 'ขยายทัพ',
        tasks: [
            'ฝึกทหาร : รถถัง ทหารราบ เครื่องบิน',
            'เคลียร์ภารกิจเรดาร์',
            'ฆ่าโจรสลัด',
            'โจมตีหนอนทราย',
            'ใช้ไอเท็มเร่งความเร็วการฝึกฝนทหาร'
        ]
    },
    {
        theme: 'Hero Initiative',
        name: 'พัฒนาฮีโร่',
        tasks: [
            'เปิดการ์ดรับสมัครฮีโร่'
        ]
    },
    {
        theme: 'Base Expansion',
        name: 'ฐานอาคาร',
        tasks: [
            'เพิ่มพลังรบในการอัพฐานอาคาร',
            'ใช้ชิปข้อมูล คริสตัลฟ้า,เขียว,เหลือง ในการอัพเกรดฐานในช่วงเวลากิจกรรม',
            'สร้างฐานอาคารเป็นกล่องของขวัญเตรียมไว้ และรอเปิดกล่องในช่วงเวลากิจกรรม',
            'ใช้ไอเท็มเร่งความเร็วการอัพเกรดสิ่งก่อสร้าง'
        ]
    },
    {
        theme: 'Age of Science',
        name: 'วิจัยเทคโนโลยี',
        tasks: [
            'เพิ่มพลังรบในการวิจัยเทคโนโลยี',
            'ใช้เฟือง',
            'ใช้ไอเท็มเร่งการวิจัย'
        ]
    }
]

export const defaultArmsRacesGroup: ArmsRaceGroup = {
    en: enArmsRaces,
    th: thArmsRaces
}

const enTemplate: ArmsRaceTemplate = {
    start: '${name} event has been started. Let\'s participate by completing the following tasks:\r\n\r\n${tasks}',
    end: '${name} event will be ended in 15 minutes.'
}

const thTemplate: ArmsRaceTemplate = {
    start: 'กิจกรรม${name}เริ่มแล้ว มาร่วมกันทำภารกิจต่อไปนี้ให้สำเร็จกันเถอะ\r\n\r\n${tasks}',
    end: 'กิจกรรม${name}จะสิ้นสุดลงใน 15 นาที'
}

export const defaultArmsRaceTemplateGroup: ArmsRaceTemplateGroup = {
    en: enTemplate,
    th: thTemplate
}

export const defaultSchedules: ArmsRaceSchedule = {
    monday: {
        '00:00': 'Interstellar Trade',
        '04:00': 'Army Expansion',
        '08:00': 'Hero Initiative',
        '12:00': 'Interstellar Trade',
        '16:00': 'Age of Science',
        '20:00': 'Base Expansion'
    },
    tuesday: {
        '00:00': 'Age of Science',
        '04:00': 'Base Expansion',
        '08:00': 'Interstellar Trade',
        '12:00': 'Army Expansion',
        '16:00': 'Base Expansion',
        '20:00': 'Hero Initiative'
    },
    wednesday: {
        '00:00': 'Army Expansion',
        '04:00': 'Hero Initiative',
        '08:00': 'Age of Science',
        '12:00': 'Base Expansion',
        '16:00': 'Interstellar Trade',
        '20:00': 'Age of Science'
    },
    thursday: {
        '00:00': 'Hero Initiative',
        '04:00': 'Interstellar Trade',
        '08:00': 'Army Expansion',
        '12:00': 'Hero Initiative',
        '16:00': 'Age of Science',
        '20:00': 'Base Expansion'
    },
    friday: {
        '00:00': 'Age of Science',
        '04:00': 'Army Expansion',
        '08:00': 'Base Expansion',
        '12:00': 'Interstellar Trade',
        '16:00': 'Army Expansion',
        '20:00': 'Hero Initiative'
    },
    saturday: {
        '00:00': 'Base Expansion',
        '04:00': 'Hero Initiative',
        '08:00': 'Age of Science',
        '12:00': 'Army Expansion',
        '16:00': 'Interstellar Trade',
        '20:00': 'Hero Initiative'
    },
    sunday: {
        '00:00': 'Age of Science',
        '04:00': 'Army Expansion',
        '08:00': 'Interstellar Trade',
        '12:00': 'Base Expansion',
        '16:00': 'Hero Initiative',
        '20:00': 'Age of Science'
    }
}

export const defaultStartsTime: ArmsRaceMap = {
    '00:05': '00:00',
    '04:05': '04:00',
    '08:05': '08:00',
    '12:05': '12:00',
    '16:05': '16:00',
    '20:05': '20:00',
}

export const defaultEndsTime: ArmsRaceMap = {
    '03:45': '00:00',
    '07:45': '04:00',
    '11:45': '08:00',
    '15:45': '12:00',
    '19:45': '16:00',
    '23:45': '20:00',
}

function updateArmsRaces(armsRaces: ArmsRaceGroup) {
    db.ref('arms-races')
        .set(armsRaces)
        .then(() => console.log('Arms Races has been updated.'))
        .catch()
}

function updateSchedules(schedules: ArmsRaceSchedule) {
    db.ref('arms-race-schedules')
        .set(schedules)
        .then(() => console.log('Arms Race schedules has been updated.'))
        .catch()
}

function updateStartsTime(startsTime: ArmsRaceMap) {
    db.ref('arms-race-starts-time')
        .set(startsTime)
        .then(() => console.log('Arms Race starts time has been updated.'))
        .catch()
}

function updateEndsTime(endsTime: ArmsRaceMap) {
    db.ref('arms-race-ends-time')
        .set(endsTime)
        .then(() => console.log('Arms Race ends time has been updated.'))
        .catch()
}

function updateTemplates(templates: ArmsRaceTemplateGroup) {
    db.ref('arms-race-templates')
        .set(templates)
        .then(() => console.log('Arms Race templates has been updated.'))
        .catch()
}
