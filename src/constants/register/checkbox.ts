import { CheckBoxType, CheckTermsTitleType, CheckTermsContentType, CheckServiceProviderType, CheckCautionType } from "@/types/CheckBoxData";

export const check: CheckBoxType[] = [
    {
        "id": 0,
        "label": "약관 전체 동의",
        "option": true,
        "check": false
    },
    {
        "id": 1,
        "label": "만 14세 이상입니다",
        "option": true,
        "check": false
    },
    {
        "id": 2,
        "label": "이용약관 동의",
        "option": true,
        "check": false
    },
    {
        "id": 3,
        "label": "개인정보 수집 및 이용 동의",
        "option": true,
        "check": false
    },
    {
        "id": 4,
        "label": "선택정보 수집 및 이용 동의",
        "option": false,
        "check": false
    },
    {
        "id": 5,
        "label": "개인정보 마켓팅 활용 동의",
        "option": false,
        "check": false
    },
    {
        "id": 6,
        "label": "마케팅 알림 수신 동의",
        "option": false,
        "check": false
    }
];

export const checkTermsTitle: CheckTermsTitleType[] = [
    {
        "id": 2,
        "order": 1,
        "title": "제1조 (약관의 효력 및 변경)",
    },
    {
        "id": 2,
        "order": 2,
        "title": "제2조 (서비스 제공)",
    },
    {
        "id": 2,
        "order": 3,
        "title": "제3조 (이용자의 의무)",
    },
    {
        "id": 2,
        "order": 4,
        "title": "제4조 (개인정보 처리)",
    },
    {
        "id": 2,
        "order": 5,
        "title": "제5조 (책임 제한)",
    },
    {
        "id": 2,
        "order": 6,
        "title": "제6조 (분쟁 해결)",
    },
    {
        "id": 2,
        "order": 7,
        "title": "제7조 (기타)",
    },
]
export const checkTermsContent: CheckTermsContentType[] = [
    {
        "id": 2,
        "order": 1,
        "content_number":1,
        "content": "1. 본 약관은 [서비스 이름] (이하 “서비스”라 합니다)의 이용과 관련하여 [서비스 제공자] (이하 “서비스 제공자”라 합니다)와 이용자 간에 체결되는 계약입니다.",
    },
    {
        "id": 2,
        "order": 1,
        "content_number":2,
        "content": "2. 이용자는 서비스를 이용함으로써 본 약관의 모든 내용에 동의하고 이를 준수하는 것으로 간주됩니다.",
    },
    {
        "id": 2,
        "order": 1,
        "content_number":3,
        "content": "3. 서비스 제공자는 본 약관을 사전에 통지없이 변경할 수 있으며, 변경된 내용은 서비스 제공자 웹사이트 ([유효하지 않은 URL 삭제됨] 공개된 후 7일 이후부터 효력을 발생합니다.",
    },
    {
        "id": 2,
        "order": 1,
        "content_number":4,
        "content": "4. 이용자는 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단해야 합니다."
    },
    {
        "id": 2,
        "order": 2,
        "content_number":1,
        "content": "1. 서비스 제공자는 이용자에게 다음과 같은 서비스를 제공합니다."
    },
    {
        "id": 2,
        "order": 2,
        "content_number":2,
        "content": "2. 서비스 제공자는 최선을 다해 서비스를 제공하되, 서비스의 무중단 제공을 보장하지는 않습니다."
    },
    {
        "id": 2,
        "order": 2,
        "content_number":3,
        "content": "3. 서비스 제공자는 서비스 제공에 필요한 시스템 및 네트워크를 유지·관리하며, 이에 필요한 변경 또는 개선을 수행할 수 있습니다."
    },
    {
        "id": 2,
        "order": 2,
        "content_number":4,
        "content": "4. 서비스 제공자는 전항에 따라 서비스가 중단 또는 지연되는 경우, 이용자에게 사전에 통지할 수 있습니다."
    },
    {
        "id": 2,
        "order": 3,
        "content_number":1,
        "content": "1. 이용자는 다음과 같은 행위를 해서는 안 됩니다\n2. 서비스 제공자는 이용자가 전항을 위반한 경우, 이용자의 서비스 이용을 제한하거나 중단할 수 있습니다."
    },
    {
        "id": 2,
        "order": 3,
        "content_number":2,
        "content": "2. 서비스 제공자는 이용자가 전항을 위반한 경우, 이용자의 서비스 이용을 제한하거나 중단할 수 있습니다."
    },
    {
        "id": 2,
        "order": 4,
        "content_number":1,
        "content": "1. 서비스 제공자는 이용자의 개인정보를 다음과 같은 목적으로 수집 및 이용합니다."
    },
    {
        "id": 2,
        "order": 4,
        "content_number":2,
        "content": "2. 서비스 제공자는 이용자의 동의 없이 제3자에게 이용자의 개인정보를 제공하지 않습니다."
    },
    {
        "id": 2,
        "order": 4,
        "content_number":3,
        "content": "3. 이용자는 자신의 개인정보를 열람, 정정, 삭제 또는 이용 중단을 요청할 수 있으며, 서비스 제공자는 요청을 접수한 후 지체없이 이를 처리해야 합니다."
    },
    {
        "id": 2,
        "order": 5,
        "content_number":1,
        "content": "1. 본 약관은 [서비스 제공자] 웹사이트 ([유효하지 않은 URL 삭제됨] 공개되어 있습니다."
    },
    {
        "id": 2,
        "order": 5,
        "content_number":2,
        "content": "2. 이용자는 서비스 이용으로 인해 발생한 모든 책임을 스스로 부담합니다."
    },
    {
        "id": 2,
        "order": 6,
        "content_number":1,
        "content": "1. 본 약관에 대한 분쟁은 **[관할 법원]**에서 관할하고 **[준거법]**을 적용합니다."
    },
    {
        "id": 2,
        "order": 7,
        "content_number":1,
        "content": "1. 본 약관에 정함이 없는 사항은 관련 법령 및 관습에 따라 정합니다."
    },
    {
        "id": 2,
        "order": 7,
        "content_number":2,
        "content": "2. 본 약관은 [서비스 제공자] 웹사이트 ([유효하지 않은 URL 삭제됨] 공개되어 있습니다."
    },
];

export const checkServiceProvider:CheckServiceProviderType[] = [
    {
        "id": 2,
        "address": "서울 서초구 서초대로 7길 33",
        "phone": "010-4747-5566",
    }
];

export const checkCaution:CheckCautionType[]=[
    {
        "id":2,
        "content":"※ 본 약관은 예시이며, 서비스의 특성에 따라 내용을 추가하거나 변경해야 할 수 있습니다.",
    },
    {
        "id":2,
        "content":"※ 이용 약관은 서비스 제공자의 웹사이트에서 확인할 수 있습니다."
    },
];
