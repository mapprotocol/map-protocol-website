---
title: "MAP 프로토콜 백서"
description: 
lang: kr
---

MAP 프로토콜은 라이트 클라이언트와 영지식 기술을 기반으로 구축된 비트코인 레이어 2 및 P2P 옴니체인 인프라로, 크로스 체인 상호 운용성에 중점을 두고 있습니다. 크로스 체인 프로세스 중에는 권한이 있는 제3자에 의존하지 않고 순전히 피어 투 피어(P2P)이며 코드만 신뢰합니다. dApp을 위한 옴니체인 스마트 컨트랙트 개발 플랫폼과 비트코인 생태계를 위한 상호운용성을 제공합니다.


---

*참고: 이 백서는 2019년에 처음 발행되었으며, 발전함에 따라 업데이트되었습니다. 다른 커뮤니티 주도의 오픈 소스 소프트웨어 프로젝트와 마찬가지로 MAP 프로토콜 백서도 출시 이후 계속 발전하고 있습니다.*

*이 백서에서는 MAP 프로토콜의 기본 원칙과 기술 프레임워크에 대해 설명하며, MAP 기술을 체계적으로 연구하고 비전을 이해하는 데 필요한 내용을 담고 있습니다. MAP 프로토콜의 최신 개발 및 업데이트에 대해 알고 싶다면 웹사이트에서 다른 관련 콘텐츠를 읽어보실 수 있습니다.*


---


# **크로스 체인에 초점을 맞춘 비트코인 ​​레이어-2**


## **비트코인 개발 역사**


## 2008년 사토시 나카모토는[ 비트코인 백서를](https://bitcoin.org/bitcoin.pdf) 발간하여 블록체인이라는 탈중앙화 원장의 청사진을 단 9페이지에 담아냈고, 통화로서의 비트코인 개념을 소개했습니다.

2008년 이후, 물리적 실체나 내재적 가치가 뒷받침되지 않고 중앙화된 기관에 의해 통제되지 않는 토큰인 비트코인은 살아남았을 뿐만 아니라 번성하여 일부 국가에서는 가치를 저장하는 수단으로서 준비 통화로 사용되기도 했습니다. 비트코인의 영향을 받은 암호화폐 분야는 혁신의 물결을 일으키며 비탈릭 부테린과 같은 사람들이 더 많은 프로그래밍 가능한 프로토콜을 개발하도록 유도하고 영감을 불어넣고 있습니다.

그러나 비트코인 네트워크 메커니즘은 변하지 않았습니다. 지난 10년 동안 비트코인 채굴과는 별개로 네트워크 메커니즘도 몇 가지 변화를 겪었습니다:



* 2012년 비트코인 네트워크는 BIP 16을 통해[ P2SH(Pay to Script Hash)](https://en.bitcoin.it/wiki/Pay_to_script_hash)를 도입하여 다중 서명 거래를 간소화했습니다. P2SH가 도입되기 전에는 다중 서명 거래가 번거롭고 위험했기 때문에 전체 상환 스크립트(지출 조건 정의)를 미리 공개해야 했습니다. P2SH를 사용하면 사용자는 상환 스크립트의 해시를 나타내는 표준화된 비트코인 주소로 자금을 송금하므로 스크립트의 복잡성을 숨길 수 있습니다. 전체 스크립트는 토큰을 사용할 때만 공개되고 조건이 충족될 때만 공개되어 거래를 간소화하고 사용자 편의성을 높이며 확장성을 개선하는 것을 목표로 합니다.
* 또 다른 매우 중요한 비트코인 개선 제안(BIP) - 세그윗(SegWit)이라고도 알려진  [Segregated Witness (SegWit)](https://en.bitcoin.it/wiki/Segregated_Witness)는 2017년에 발표되었습니다. 이는 트랜잭션의 확장성을 해결하고 블록 크기 제한을 기존 1MB에서 4MB로 효과적으로 늘렸습니다.
* 세그윗(SegWit)은 2021년에  [탭루트(TapRoot)라는](https://en.bitcoin.it/wiki/Taproot_activation_proposals) 제안을 위한 길을 열었습니다. 탭루트(TapRoot)는 트랜잭션을 보다 효율적이고 비공개적으로 만들며, 사용자가 보다 복잡한 트랜잭션 유형에 참여할 수 있도록 합니다.


## **비트코인 생태계의 미래**


## 2021년 탭루트(TapRoot) 업그레이드를 통해 다중 서명 거래를 더 빠르게 검증할 수 있으며, 가장 작은 단위의 비트코인('사토시'라고 함)에 텍스트, 이미지, SVG, HTML을 새길 수 있는 문이 열렸습니다. 2023년 5월, 실험적인 비트코인 대체 토큰 표준인 BRC-20이 제안되고 폭발적으로 증가하면서 사람들은 비트코인 생태계 상호운용성의 미래에 더 많은 관심을 기울이고 있습니다.

P2P 크로스 체인 상호 운용성을 통해 다른 퍼블릭 체인의 자산과 사용자가 비트코인 네트워크로 이동할 수 있는 방법 또한 업계가 탐구해 온 기술적 문제입니다. 비트코인 수준의 P2P 교차 체인 인프라로서 MAP 프로토콜은 비트코인 레이어 2로서 이 목표를 달성하고 비트코인 생태계의 상호 운용성을 강화하기 위해 최선을 다하고 있습니다.


# **피어 투 피어(P2P) 크로스체인 스마트 컨트랙트 및 웹3.0 디앱 개발 플랫폼**

2019년 사토시 나카모토가 비트코인을 개발한 것은 자산과 통화에 있어 혁명적인 혁신이었습니다. 그 이유는 비트코인이 특권을 가진 제3자 기관 없이도 한 당사자가 시작하고 다른 당사자가 수락하는 P2P, 신뢰가 필요 없는 제3자 전자 화폐(자산)이기 때문입니다.

비트코인 이전에는 암호화 기술의 디지털 서명이 디지털 화폐의 문제를 해결했지만, 이중 지출을 방지하기 위해 신뢰할 수 있는 제3자가 필요했습니다. P2P 기술의 주요 혁신으로 비트코인은 큰 성공을 거두었고, 사람들은 블록체인 산업과 다른 블록체인 기술의 적용에 더 많은 관심을 기울이고 있습니다.

2020년까지 탈중앙화 금융의 부상으로 많은 블록체인 메인넷이 탄생했고, 사용자들의 크로스 체인에 대한 요구가 폭발적으로 증가하면서 수많은 크로스 체인 솔루션이 시장에 출시되었습니다. 많은 크로스체인 솔루션이 등장했지만, 대부분은 기본적으로 이중지불을 방지하기 위해 오프체인 서드파티의 역할에 의존하고 있습니다. 즉, 크로스 체인 이벤트의 유효성 여부는 해당 이벤트가 오리진 체인(Origin Chain)에서 발생하는지 여부가 아니라 오프체인 합의 노드 또는 신뢰 가정을 가진 역할 그룹에 따라 달라집니다. 다양한 보안 가정을 통합했지만, 이는 사토시 나카모토가 정의한 탈중앙화된 P2P 및 신뢰 없는 제3자 역할의 정신과는 완전히 상반됩니다.

그러나 이러한 크로스체인 솔루션의 대부분은 이중지불을 방지하기 위해 기본적으로 오프체인 제3자 중개자에 의존하며, 즉 크로스체인 이벤트의 유효성은 소스 체인에서 발생했는지 여부가 아니라 오프체인 합의와 신뢰 가정을 가진 일련의 검증자 또는 역할에 의해 결정됩니다. 다양한 보안 가정을 포함하지만, 이는 사토시 나카모토의 P2P에 대한 정의와 제3자 탈중앙화 정신과 근본적으로 상충됩니다.

플로카닷과 코스모스는 P2P 크로스체인 상호운용성을 달성했지만, 크로스체인 상호운용성은 생태계 내 체인에만 국한되어 있다는 점에 주목할 필요가 있습니다. 이는 사용자의 요구를 충족시키기에는 충분하지 않습니다. 업계는 모든 유형의 체인을 포괄하고 완전한 피어 투 피어(P2P)를 지원하는 크로스체인 스마트 콘트랙트 개발 플랫폼이 절실히 필요합니다.

MAP 프로토콜은 사토시 나카모토가 정의한 간소화된 결제 검증(SPV) 라이트 클라이언트 기술을 채택하여 라이트 클라이언트 검증 메커니즘을 스마트 컨트랙트로 혁신적으로 전환하고 제3자가 아닌 코드를 신뢰함으로써 피어 투 피어(P2P) 크로스 체인 검증을 실현합니다. 거래의 유효성 여부는 어떤 형태의 오프체인 제3자 역할이나 조직이 아닌 소스 체인의 발생 여부에만 의존하며, 영지식(Zero Knowledge) 증명 기술을 통해 크로스 체인 검증 효율성을 더욱 향상시킵니다. 동시에 MAP 릴레이 체인은 내장된 사전 컴파일된 컨트랙트를 통해 모든 종류의 레이어1 서명, 해싱 및 채굴 알고리즘을 포함할 수 있으며, 이기종 체인과의 크로스 체인 상호 운용성을 달성하고 P2P 옴니체인 디앱 개발 시대를 열었습니다.


# **배경**

**지금까지 탈중앙화 금융 네트워크에는 세 가지 단계가 있습니다.**



1. 비트코인 P2P 전자 현금 결제 시스템의 탄생: 2009년 이후 암호화폐 산업이 탄생하고 중앙 집중식 거래소(CEX)의 개발이 촉진되었습니다.
2. 이더리움의 프로그래밍 가능한 스마트 컨트랙트의 등장: 2015년 이후 퍼블릭 체인과 탈중앙화 애플리케이션(dApp)의 개발이 활발해졌습니다.
3. 옴니체인 네트워크 인프라의 등장: 옴니체인 디앱을 가능하게 하고 개발을 크게 촉진합니다.

MAP 프로토콜 이전에는 세 가지 주요 크로스 체인 솔루션이 있었습니다:



1. CEX: 중앙화된 기관으로 고객신원확인, 콜드월렛, 규제 준수와 같은 방법을 통해 사용자 자산 거래소의 안전을 보장하는 것이 특징입니다.
2. 오프체인 합의 검증 메커니즘: 여기에는 MPC, 오라클 기반 검증, 검증자에 의한 교차 검증, 낙관적 롤업 등이 포함됩니다. 이러한 솔루션 중 MPC 교차 체인 브리지는 권한 있는 역할의 존재를 제거할 수 없으며 해킹이나 내부자 공격에 취약합니다. 오라클은 블록 헤더를 기반으로 검증할 수 있지만, 해당 헤더를 위조하여 잘못된 검증을 초래할 수 있습니다. 검증자가 수행하는 크로스체인 검증, 즉 오프체인에서 수행하는 검증은 담합 위험을 수반합니다. 낙관적 롤업은 안전하지만 검증 대기 시간이 길어집니다.
3. 폴카닷과 코스모스: 둘 다 비트코인 수준의 P2P 크로스체인 솔루션이지만 내부 생태계 체인 간 통신으로 제한되며, EVM 체인 및 기타 이기종 체인과 P2P 상호 운용이 불가능합니다.

**MAP 프로토콜 피어투피어 크로스체인 솔루션**

P2P 크로스체인 검증을 달성하려면 두 가지 주요 장애물을 해결해야 합니다:



1. 각 체인의 서명, 해싱 알고리즘, 합의가 서로 다르고 이질적인데 어떻게 데이터가 통신할 수 있을까요?
2. 인터체인 메시징 컴포넌트가 전송하는 크로스체인 요청이 실제로 소스 체인에서 온 것인지 확인하는 방법은 무엇인가요?


## **타사 신뢰에 의존하는 크로스 체인 솔루션**

이는 일반적으로 제3자 오프체인 증인 그룹이 감독하며, 이들은 자산을 스테이킹하거나 평판이 좋은 기존 브랜드의 권한을 사용해 크로스체인 요청이 유효한지 결정하여 이중 지출을 방지합니다. 일부 솔루션은 요청과 검증에 동일한 역할을 사용하지만, 다른 솔루션은 이를 분리하기도 합니다. 이러한 제3자 합의 솔루션에 대한 신뢰는 코드 기반이 아니라 제3자의 신뢰성에 의존하기 때문에 P2P, 신뢰 없는 탈중앙화라는 사토시의 비전과 상반됩니다. 폴카닷과 코스모스는 P2P이긴 하지만 이기종 체인과 EVM 체인 간의 상호운용성 문제를 해결하지 못합니다.

** \
모든 유형의 체인을 포괄할 수 있는 P2P, 무신뢰 크로스체인 네트워크**



1. 데이터 이질적인 블록체인 메인넷을 알고리즘적으로 조화시키는 릴레이 체인을 설정합니다. MAP 프로토콜은 피어 투 피어(P2P), 합의 계층, 스마트 컨트랙트 개발 계층의 세 가지 계층으로 구성되어 있습니다. 체인마다 서명 알고리즘과 해시 알고리즘이 다릅니다. 예를 들어, 이더리움은 secp256k1 서명 알고리즘과 keccak-256 해시 알고리즘을 사용합니다. NEAR는 ed25519 서명 알고리즘과 SHA-256 해시 알고리즘을 사용하며, Conflux는 POW 마이닝 메커니즘을 사용합니다. 간단히 말해, 블록체인 거래는 한 당사자가 거래에 서명하고 다른 당사자가 해시를 해독하여 거래를 수락함으로써 시작되며, 제3자의 신뢰가 개입되지 않습니다. 서로 다른 체인을 포괄하는 P2P 네트워크를 구축하려면 이러한 서로 다른 알고리즘을 동질적으로 만드는 릴레이 체인이 존재해야 합니다.

    MAP 프로토콜의 솔루션은 다양한 체인 서명 알고리즘, 해시 알고리즘, 마이닝, 머클(Merkle) 트리 증명을 포함하는 사전 컴파일된 컨트랙트가 포함된 MAP 릴레이 체인의 가상 머신 개발 레이어에 구축되어 있습니다. MAP 릴레이 체인은 주류 알고리즘을 동질화하는 것을 목표로 하며, 이 사전 컴파일된 컨트랙트에 이미 통합된 알고리즘은 다음과 같습니다.


    SHA3


    SHA-256


    ed25519


    secp256k1


    keccak-256


    sr25519


    blake2b


    머클(Merkle) 트리 증명


    이 접근 방식은 많은 작업이 필요하지만, 다른 알고리즘을 사용하는 대상 체인이 다른 알고리즘을 사용하는 원본 체인으로부터 교차 체인 트랜잭션 데이터를 읽고 검증할 수 있습니다. EVM과 비 EVM은 가상 머신 개발 계층의 차이만을 의미하며, 일반적인 의미의 이기종 체인은 서명 알고리즘, 해시 알고리즘, 마이닝 알고리즘이 다르다는 점에 유의해야 합니다. 릴레이 체인을 통해 데이터 동질성을 달성한 후에는 서로 다른 체인에서 트랜잭션 데이터를 읽을 수 있습니다. 다음으로 해결해야 할 문제는 제3자가 없는 P2P 거래에서 발생하는 이중지불 문제입니다.

1. 오리진 체인(Origin Chain)의 간편결제 검증용 라이트 클라이언트는 스마트 컨트랙트로서 타겟 체인에 배포됩니다. 예를 들어, 이더리움에서 NEAR로 피어 투 피어(P2P) 크로스 체인 트랜잭션이 시작되면 먼저 이더리움의 라이트 클라이언트를 MAP 릴레이 체인에 스마트 컨트랙트로 배포한 다음, MAP 릴레이 체인의 라이트 클라이언트를 NEAR에 스마트 컨트랙트로 배포해야 합니다.
2. 크로스 체인 메세지 전달은 오리진 체인(Origin Chain)에서 타겟 체인으로 크로스 체인 요청을 전달하는 오프체인 메신저 그룹에 의해 관리됩니다. 그러면 대상 체인의 오리진 체인(Origin Chain) 라이트 클라이언트 스마트 컨트랙트가 요청의 유효성을 검사합니다.
3. 라이트 클라이언트 업데이트는 오리진 체인(Origin Chain)에서 타겟 체인에 배포된 스마트 컨트랙트로 최신 블록 헤더와 머클(Merkle) 트리 증명을 업데이트하는 오프체인 관리자 그룹이 담당합니다. 메신저와 유지관리자는 메시지 전달자 역할만 하며, 크로스 체인 검증에 대한 권한이 없습니다. 자체 검증 라이트 클라이언트 스마트 콘트랙트에 대한 이들의 공격은 효과적이지 않습니다.
4. 대상 체인에 배포된 라이트 클라이언트 스마트 컨트랙트는 오프체인 역할이 전달한 크로스체인 요청의 지점 간 유효성 검증을 수행하고 트랜잭션 실행을 위해 이를 브로드캐스트합니다.



![alt_text](/images/article/images/whitepaper-1.png "image_tooltip")



## **라이트 클라이언트**

사토시 나카모토는[ 비트코인 백서에서](https://bitcoin.org/bitcoin.pdf) 간편 결제 검증(SPV)을 처음 정의하며 "전체 네트워크 노드를 실행하지 않고도 결제를 검증할 수 있다"고 말했습니다. 사용자는 가장 긴 작업 증명 (PoW)체인의 블록 헤더 사본만 보관하면 되며, 가장 긴 체인이 있다고 확신할 때까지 네트워크 노드를 쿼리하여 거래를 타임스탬프가 찍힌 블록에 연결하는 머클(Merkle) 브랜치를 얻을 수 있습니다. 그는 트랜잭션을 직접 확인할 수는 없지만, 이를 체인의 한 지점에 연결함으로써 네트워크 노드가 이를 수락했음을 확인할 수 있고, 그 이후에 추가된 블록은 네트워크가 이를 수락했음을 추가로 확인합니다."

그에 따라서,


## **신뢰할 필요 없이(TrustLess)스스로 검증하는 라이트 클라이언트의 특성**

오라클 솔루션도 블록 헤더를 통해 크로스체인 유효성을 검증하지만, 오라클은 스마트 콘트랙트 수준의 코드 신뢰가 아닙니다. 대신, 제출된 블록 헤더 정보를 변조할 수 있는 권한을 가진 오프체인 제3자 역할 그룹에 의해 구성됩니다. MAP 프로토콜의 솔루션은 스마트 컨트랙트 형태로 오리진 체인(Origin Chain)의 라이트 클라이언트를 타겟 체인에 배포합니다. 트랜잭션의 진위 여부와 유효성에 대한 크로스체인 검증은 전적으로 타겟 체인에 있는 오리진 체인(Origin Chain)의 라이트 클라이언트 스마트 컨트랙트를 통해 이루어집니다. 라이트 클라이언트 스마트 콘트랙트는 최장 체인 원칙을 따르며, 오리진 체인(Origin Chain)의 최신 라이트 클라이언트 상태를 타겟 체인의 해당 스마트 콘트랙트와 동기화하는 크로스 체인 메시지 역할 유지 관리자 그룹에 의해 유지 관리됩니다. 이 스마트 콘트랙트는 트랜잭션의 최장 체인 검증을 충족하기에 충분한 오리진 체인(Origin Chain)의 블록 헤더와 머클(Merkle) 트리 증명 데이터를 저장합니다.

유지관리자는 오프체인 프로그램이지만, 라이트 클라이언트 스마트 컨트랙트가 정확하고 정직하게 초기화(브라우저의 해당 라이트 클라이언트 페이지에 연결)되면, 유지관리자는 이후에 추가된 라이트 클라이언트 상태, 즉 블록 헤더와 머클(Merkle) 트리를 조작할 기회가 없습니다. 블록체인은 트랜잭션 정보가 포함된 블록을 역순으로 연결하는 데이터 구조이기 때문입니다. 각 블록 헤더는 이전 블록 헤더의 해시값을 연결합니다. 잘못된 블록 헤더는 스마트 컨트랙트에 이미 저장된 실제 블록 헤더의 해시값과 일치할 수 없으며, 스마트 컨트랙트는 코드 트러스트이기 때문에 누구도 다시 수정할 수 없습니다. 따라서 라이트 클라이언트 스마트 컨트랙트에 대한 유지 관리자의 악의적인 공격은 효과가 없습니다. 반면 머클(Merkle) 트리의 일부를 변경하려는 시도는 궁극적으로 체인 어딘가에서 불일치를 초래하여 라이트 클라이언트 스마트 콘트랙트에 대한 관리자의 공격이 무효화됩니다.


## **블록 헤더 및 머클(Merkle) 트리**

블록체인 네트워크에서 블록은 다단계 데이터 구조에 저장됩니다. 블록의 해시는 실제로 타임스탬프, 논스, 이전 블록의 해시, 머클(Merkle) 트리의 루트 해시를 포함하는 고정된 바이트 크기의 데이터인 블록 헤더의 해시일 뿐입니다. 머클(Merkle) 트리는 해당 블록의 모든 트랜잭션을 저장하는 데이터 구조입니다. 머클(Merkle) 트리는 이진 트리로, 리프 노드 세트, 중간 노드 세트, 루트 노드로 구성됩니다. 맨 아래에는 기본 데이터를 포함하는 수많은 리프 노드가 있고, 각 중간 노드는 두 자식 노드의 해시이며, 맨 위 루트 노드 역시 두 자식 노드의 해시입니다.

머클(Merkle) 트리의 목적은 블록 데이터를 조각으로 전송할 수 있도록 하는 것입니다. 노드는 한 소스에서 블록 헤더를 다운로드하고 다른 소스에서 관련 트리의 작은 부분을 다운로드하면서도 모든 데이터가 올바른지 확인할 수 있습니다. 이는 해시가 위쪽으로 전파되기 때문입니다. 악의적인 사용자가 트리의 맨 아래에서 가짜 트랜잭션을 대체하려고 하면 트리의 상위 계층에 있는 노드가 변경되고, 상위 노드가 더 변경되어 결국 루트 노드가 변경되고 블록 해시가 변경되므로 프로토콜은 이를 완전히 다른 블록으로 기록합니다(거의 확실하게 잘못된 작업 증명이 포함됨).

머클(Merkle) 트리 프로토콜은 블록체인의 장기적인 연속성을 위한 기반이라고 할 수 있습니다. 블록체인 네트워크의 풀 노드는 모든 블록 데이터를 저장하고 처리하는 노드로, 데이터 규모가 너무 커서 트랜잭션을 검증하는 데 많은 워크로드를 유발합니다. SPV(간편결제 검증)를 사용하면 다른 유형의 노드가 존재할 수 있는데, 이러한 노드를 "라이트 노드"(라이트 클라이언트)라고 하며, 블록 헤더를 다운로드하고 블록 헤더를 사용하여 작업 증명을 확인한 다음 거래와 관련된 머클(Merkle) 트리 분기만 다운로드합니다. 이를 통해 라이트 노드는 전체 블록체인의 일부만 다운로드하여 모든 거래의 상태와 계정의 현재 잔액을 안전하게 확인할 수 있습니다.



![alt_text](/images/article/images/whitepaper-2.png "image_tooltip")


***왼쪽: ***머클(Merkle) 트리에 적은 수의 노드만 제공해도 브랜치에 대한 정당한 증명을 제공할 수 있습니다.

***오른쪽:*** 머클(Merkle) 트리의 어떤 부분을 변경하려고 시도하면 결국 체인 어딘가에서 불일치가 발생하게 됩니다.


## **영지식(Zero Knowledge) 증명**


## 영지식(Zero Knowledge) 증명은 진술 자체를 공개하지 않고 진술의 유효성을 검증하는 방법을 말합니다. 증명자는 진술을 증명하려는 당사자이며, 검증자는 이를 검증할 책임이 있습니다. 이더리움 커뮤니티를 통해 영지식(Zero Knowledge) 증명 기술의 효과는 충분히 인정받았습니다. 크로스 체인 검증에서, P2P 크로스 체인의 유효성 검증에 영향을 미치지 않으면서도 영지식 기술은 크로스 체인 검증 시간을 단축하고 라이트 클라이언트 스마트 콘트랙트 검증의 가스 비용을 절감할 수 있습니다.


### **라이트 클라이언트와 영지식을 결합한 피어 투 피어(P2P) 크로스체인 검증 솔루션**

MAP 프로토콜 기술 메커니즘에서 영지식 증명은 오리진 체인(Origin Chain)의 BLS 총합 서명 해시값을 검증하고, 라이트 클라이언트 스마트 컨트랙트가 머클(Merkle) 증명을 검증한 후 영지식 증명을 다시 검증하는 역할을 담당합니다. 다양한 블록체인 알고리즘과 호환되는 MAP 릴레이 체인을 결합함으로써 MAP 프로토콜은 사토시 나카모토가 정의한 대로 권한 있는 제3자 없이 코드 신뢰를 달성했으며, 다양한 유형의 블록체인을 포괄하여 진정한 피어 투 피어(P2P) 크로스 체인 블록체인 네트워크를 실현할 수 있습니다.


# **MAP 프로토콜 3계층 아키텍처**



![alt_text](/images/article/images/whitepaper-3.png "image_tooltip")



옴니체인 인프라의 전반적인 유연성과 견고성을 보장하기 위해 MAP 프로토콜의 기술 아키텍처는 프로토콜 계층, MOS 전체 체인 서비스 계층, 애플리케이션 계층의 세 가지 계층으로 나뉩니다.

중간 계층은 MOS(MAP 옴니체인 서비스)로, 디앱이 크로스체인 스마트 컨트랙트 애플리케이션을 빠르게 배포하는 데 도움이 되는 일련의 구성 요소 도구를 제공합니다. 여기에는 크로스 체인 트랜잭션 전달 역할 메신저, 크로스 체인 락업 스마트 콘트랙트, 크로스 체인 메시지 구성 요소 등이 포함됩니다. 세 번째 레이어는 애플리케이션 레이어로, MAP 프로토콜 전체 체인 스마트 컨트랙트 생태 애플리케이션입니다.


## **MAP 프로토콜 프로토콜 계층**

MAP 프로토콜 프로토콜 레이어는 MAP 프로토콜의 최하위 레이어로, 크로스 체인 견인 검증과 피어 투 피어(P2P) 크로스 체인 보장을 담당합니다. MAP 릴레이 체인, 미안티아너, 영지식에 최적화된 라이트 클라이언트를 포함한 MAP 프로토콜의 핵심입니다.


#### **MAP 릴레이 체인**

MAP 릴레이 체인은 지분 증명(POS) 메커니즘을 기반으로 하는 블록체인입니다. 비트코인과 같은 작업 증명(POW) 시스템에 비해 환경 친화적입니다. POS 메커니즘을 통해 사용자는 한 번 완료되면 되돌릴 수 없는 결과로 더 저렴하고 빠른 거래를 수행할 수 있습니다. MAP 릴레이 체인은 이스탄불 비잔틴 장애 허용(IBFT) 합의 알고리즘을 구현하여, 최대 1/3의 노드가 오프라인이거나 결함이 있거나 악의적인 경우에도 잘 정의된 검증자 노드 그룹이 일련의 단계로 서명된 메시지를 브로드캐스팅하여 합의에 도달할 수 있도록 합니다. 유효성 검사자 정족수가 합의에 도달하면 그 결정이 최종 결정이 됩니다. Atlas에 대한 자세한 내용은 관련 기술 문서를 참조하세요. MAP 릴레이 체인의 독특한 특징은 거의 모든 체인의 핵심 알고리즘을 통합하는 사전 컴파일된 컨트랙트를 가지고 있다는 것입니다.


#### **유지 관리자**

유지관리자는 오리진 체인(Origin Chain) 합의 레이어에서 타겟 체인에 배포된 라이트 클라이언트 스마트 콘트랙트에 최신 블록 헤더와 머클(Merkle) 트리 증명을 업데이트하는 역할을 담당하는 오프체인 역할 그룹입니다. 유지 관리자는 오프체인 프로그램이지만, 라이트 클라이언트 스마트 콘트랙트가 정확하고 정직하게 초기화되면(브라우저의 해당 라이트 클라이언트 페이지에 연결), 유지 관리자는 이후에 추가된 라이트 클라이언트 상태, 즉 블록 헤더와 머클(Merkle) 트리를 조작할 수 있는 기회가 없습니다. 따라서 라이트 클라이언트 스마트 컨트랙트에 대한 관리자의 악의적인 공격은 효과가 없습니다.


## **영지식-개선된 라이트 클라이언트**

라이트 클라이언트를 사용하여 크로스 체인 검증을 수행하는 것은 P2P 탈중앙화 방식이지만, 제3자에 의존하는 다른 크로스 체인 솔루션에 비해 검증 비용이 높고 효율성도 상대적으로 낮습니다. 따라서 MAP 프로토콜은 영지식 기술을 혁신적으로 도입하여 라이트 클라이언트를 사용한 P2P 크로스 체인 검증을 영지식으로 최적화하여 검증 속도를 최적화합니다.

**라이트 클라이언트 크로스 체인 피어 투 피어(P2P) 검증 메커니즘**

지분 증명(PoS) 메커니즘 L1과 작업 증명 (PoW)메커니즘 L1은 블록 헤더의 범주가 다릅니다. 지분 증명(PoS) 메커니즘에서 블록 헤더 검증의 핵심은 검증자의 서명 정보를 검증하는 것입니다. 구체적인 구현 로직은 다음과 같습니다:


#### **오리진 체인(Origin Chain)은 지분 증명(PoS) 메커니즘 블록체인입니다.**

오리진 체인(Origin Chain)의 라이트 클라이언트가 타겟 체인의 스마트 콘트랙트에 배포될 때, 오리진 체인(Origin Chain)의 검증자 세트가 변경되는 경우, 유지 관리자는 오리진 체인(Origin Chain) 검증자 세트의 BLS 집계 서명 및 투표 가중치를 타겟 체인에 배포된 라이트 클라이언트 스마트 콘트랙트에 기록합니다. 대상 체인에 배포된 라이트 클라이언트 스마트 콘트랙트는 오리진 체인(Origin Chain)([사토시의 최장 체인 원칙)](https://learnmeabitcoin.com/technical/longest-chain) 검증자 위원회의 여러 조건에 대한 검증자 공개 키와 투표 가중치를 저장합니다.

지분 증명(PoS) 메커니즘 체인의 각 텀은 이전 텀의 위원회의 서명 승인에 의해 생성되므로, 오프체인 프로그램인 유지 관리자가 대상 체인 라이트 노드에 허위 오리진 체인(Origin Chain) 검증자 세트 정보를 작성하려고 하면 라이트 노드(라이트 클라이언트) 스마트 컨트랙트에 저장된 이전 텀의 서명 검증자 정보는 허위 서명 검증자 세트에 이전 위원회의 서명 권한이 없으므로 쓰기 요청이 통과되지 않으며, 통과하려면 전체 원산지 체인에 대한 공격을 하거나 스마트 컨트랙트를 다시 작성해야만 합니다. 이 시점에서 피어 투 피어(P2P)에 대한 독립적인 자체 검증이 보장됩니다.

**오리진 체인(Origin Chain)은 작업 증명 (PoW)메커니즘 블록체인입니다.**

오리진 체인(Origin Chain)의 라이트 클라이언트가 타겟 체인의 스마트 컨트랙트에 배포된 경우, 유지 관리자는 오리진 체인(Origin Chain)의 최신 블록 헤더 정보를 타겟 체인의 라이트 클라이언트 컨트랙트에 동기화할 책임이 있으며, 타겟 체인에 배포된 라이트 클라이언트 컨트랙트는 오리진 체인(Origin Chain)의 최신 N번째 블록 헤더를 저장하고, 만약 유지 관리자가 잘못된 블록 헤더를 원본 체인에 기록하려고 하면 잘못된 정보는 이전 블록 헤더 해시값과 일치하지 않으므로 타겟 체인에 저장된 라이트 클라이언트 스마트 계약에서 승인되지 않게 됩니다.


## **MAP 릴레이 체인을 위한 영지식 개선 라이트 클라이언트**



![alt_text](/images/article/images/whitepaper-4.png "image_tooltip")



MAP 프로토콜의 크로스 체인 검증은 주로 타겟 체인에 배포된 오리진 체인(Origin Chain)의 라이트 클라이언트 스마트 컨트랙트에 의해 수행되며, 다음 두 가지 검증을 수행합니다:


        1.	블록 헤더의 정확성 검증: 관리자가 기록하도록 요청한 블록 헤더의 적법성을 검증합니다. 다양한 체인 합의 메커니즘에 따라 이 검증 방식은 달라집니다. 지분 증명(PoS)과 BFT 메커니즘을 사용하는 체인의 경우 일반적으로 블록 헤더에 표시된 합법적인 서명이 투표권의 2/3 이상을 가지고 있는지 확인합니다.


        2.	머클(Merkle) 증명 검증: 특정 블록 높이에서 특정 이벤트가 발생했는지, 블록 헤더에 올바른 머클(Merkle) 루트 값이 필요한지, 첫 번째 단계에서 정확성을 보장하는지 확인합니다. 이더리움의 구조와 유사한 블록체인 그룹에서 이 머클(Merkle) 증명은 일반적으로 머클(Merkle) 패트리샤 트리의 존재, 즉 영수증 트리 MPT에 실제로 특정 이벤트가 포함되어 있음을 증명합니다.

zkSNARK 기술을 사용하여 MAP 릴레이 체인 라이트 클라이언트의 구현을 개선하는 것은 두 가지 문제를 해결하는 것을 목표로 합니다:


        1.	라이트 클라이언트 컨트랙트에 저장해야 하는 맵 릴레이 체인 메타데이터의 양을 줄여 라이트 클라이언트 자체의 상태를 업데이트하는 데 드는 가스 비용을 낮춥니다.


        2.	블록 헤더 적법성 검증 프로세스의 서명 유효성 및 서명 무게 확인 부분을 영지식(Zero Knowledge) 증명 회로로 이동하고 가스 비용을 줄이기 위해 검증에 Groth16 체계를 사용합니다.

MAP 릴레이 체인 라이트 클라이언트 스마트 컨트랙트에서는 현재 에포크에 있는 모든 검증자의 공개키와 스테이킹 가중치 정보를 저장해야 합니다. 새로운 블록 헤더의 유효성을 검증할 때, 블록 헤더의 정보와 라이트 클라이언트 컨트랙트에 저장된 현재 검증자 정보를 기반으로 라이트 클라이언트 컨트랙트는 블록 헤더의 합산 서명 검증에 필요한 합산 공개키를 계산할 수 있습니다.

집계 서명 검증이 통과되고 집계 공개키가 나타내는 투표 가중치의 합이 2/3를 초과하면 블록 헤더는 검증을 통과합니다. zkSNARK를 기반으로 구축된 MAP 릴레이 체인 라이트 클라이언트에서는 현재 검증자 세트 메타데이터의 커밋 값만 저장하면 됩니다(예: SHA256((pk_0, wt_0), (pk_1, wt_1), ..., (pk_n, wt_n)). 즉, 라이트 클라이언트 컨트랙트는 공개 키와 가중치 정보를 n개 저장해야 하는 것에서 256비트 커밋 값만 저장하면 되는 것으로 간소화됩니다.

따라서 zkSNARK를 기반으로 구축된 MAP 릴레이 체인 라이트 클라이언트의 블록 헤더 검증 로직은 입력된 블록 헤더가 현재 커밋 값으로 표현되는 검증자 세트 정보 내에서 올바른 블록인지 여부로 단순화할 수 있습니다. 이 판단의 성공 여부는 블록 헤더와 함께 입력된 zkSNARK 증명에 따라 달라집니다.


### **zkSNARK 도입 후 크로스체인 메커니즘**

명확히 하기 위해, zkSNARK 도입 후 크로스체인 프로세스에서 새롭게 도입된 증명자의 역할, 메신저/메인터너의 업데이트된 로직, 각 당사자가 받는 입력은 다음과 같습니다:



![alt_text](/images/article/images/whitepaper-5.png "image_tooltip")



증명자의 입력: 블록 헤더, 현재 검증자 세트에 있는 각 검증자의 공개 키, 투표 가중치.


        1.	회로의 입력: t0과 t1, 검증할 집계 서명, 현재 검증자 세트에 있는 각 검증자의 공개 키와 투표 가중치, 집계 검증자를 나타내는 비트맵.


        2.	라이트 클라이언트 이벤트 적법성 검증을 위한 입력: 블록 헤더, zk-proof, mpt-proof.


        3.	라이트 클라이언트 동기화 커밋 적법성 검증을 위한 입력: 블록 헤더, zk-proof.

여기서 t0과 t1은[ 현재 라이트 클라이언트 구현 코드를](https://github.com/mapprotocol/map-contracts/blob/main/mapclients/eth/contracts/bls/BGLS.sol#L204-L218) 참조하는 블록 헤더 hashToG1의 중간 값입니다. 회로가 전체 블록 헤더 대신 t0과 t1을 입력으로 선택하는 이유는 hashToG1 내부의 hashToBase 계산을 회로로 표현하는 것은 비용이 많이 들고 그만한 가치가 없기 때문입니다. 증명자 서버는 유지 관리자나 메신저가 제출한 블록 헤더 정보를 받으면 관련 연산을 계속 실행합니다.

증명자는 블록 헤더, 현재 검증자 세트에 있는 각 검증자의 공개 키, 투표 가중치 등 입력 매개변수와 함께 증명 생성 요청을 위한 인터페이스를 노출하는, 증명을 생성하는 서버로 이해할 수 있습니다. 출력은 zk-증명입니다.

앞서 언급한 이유로, 증명자는 zk-증명 계산을 시작하기 전에 먼저 요청의 블록 헤더에서 zk-증명을 생성하는 데 필요한 파라미터인 t0과 t1, 집계 서명에 참여하는 검증자를 나타내는 비트맵을 추출하여 계산한 다음, zk-증명의 구체적인 계산 과정을 수행합니다.

회로의 인코딩 로직은 다음과 같습니다:


        1.	블록 헤더의 비트맵과 전체 유효성 검사기 세트의 정보에 따라 총 공개 키를 계산하고 총 공개 키가 나타내는 서명 가중치가 2/3를 초과하는지 확인합니다.


        2.	t0과 t1을 기반으로 해시ToG1의 최종 결과를 계산하고, 이 값과 검증할 총 공개 키, 총 BLS 검증을 사용하여 서명의 유효성을 확인합니다.

최종 zk-proof는 특정 공개 입력에 따라 위 문장의 적법성을 증명하는 것입니다. 라이트 클라이언트가 블록 헤더를 검증하는 과정에서 라이트 클라이언트가 저장한 커밋 정보와 검증할 블록 헤더 정보를 바탕으로 공개 입력을 구성하고, 이를 바탕으로 zk-proof의 적법성을 검증합니다. 검증이 가능하다는 것은 해당 블록 헤더의 적법성을 증명하는 zk-proof가 유효하다는 것을 의미합니다.


### **예제 연습**

라이트 클라이언트의 이벤트 적법성 검증을 예로 들면, 입력에는 블록 헤더, zk 증명, 머클(Merkle) 증명이 포함됩니다. 전체 증명 검증 프로세스는 다음과 같습니다:

입력 블록 헤더와 해시투베이스에 따라 t0과 t1을 계산합니다.

t0, t1, 자체 저장된 현재 유효성 검사기 세트의 커밋을 공개 입력으로 받아 그로스-16 체계에 따라 zk-proof의 적법성을 검증합니다.

두 번째 단계가 확인되면 블록 헤더가 합법적이라는 뜻입니다. 그런 다음 머클(Merkle) 패트리샤 트리(MPT)의 루트 노드(MPT 루트)를 추출하여 mpt-증명의 합법성을 계속 확인합니다.

첫 번째 단계는 회로 구성을 수용하기 위해 도입된 추가 계산입니다. 적절한 것을 검증하기 위해 적절한 체계를 사용한다는 적절한 원칙이 반영되어 있습니다. 해시투베이스에 포함된 계산은 견고성에서는 비용이 많이 들지 않지만 회로에서는 그만한 가치가 없습니다. 블록 헤더 검증의 핵심 단계는 두 번째 단계로, 실제로 입력 블록 헤더가 라이트 클라이언트가 저장한 커밋에 해당하는 유효성 검사기 세트에 따라 합법적인 블록 헤더인지 확인하는 것입니다. 이 추론은 회로의 내부 논리에서 쉽게 추론할 수 있습니다. 세 번째 단계는 현재 라이트 클라이언트의 구현과 차이가 없습니다.

라이트 클라이언트가 동기화 제출의 적법성을 검증하는 과정은 기본적으로 위의 과정과 동일하지만, 3단계에서 MPT 루트의 적법성을 검증하는 작업이 새로운 검증자 세트 정보에 따라 커밋을 다시 계산하고 자체 저장소를 업데이트하는 것으로 대체된다는 차이점이 있습니다.


### **결론**


### 앞서 설명한 내용에 따르면, zkSNARK를 기반으로 MAP 릴레이 체인 라이트 클라이언트를 업그레이드한 후 유지 관리자/메신저가 수행해야 하는 조정은 다음과 같습니다:


        1.	관리자가 라이트 클라이언트 상태를 업데이트하려면 먼저 증명자로부터 zk-증명을 얻고 블록 헤더와 zk-증명을 사용하여 tx를 구성해야 합니다.


        2.	메신저가 크로스체인 요청을 시작하기 전에 증명자로부터 zk-증명을 받고 블록 헤더, zk-증명, mpt-증명을 사용하여 tx를 구성해야 합니다.

프론트엔드를 통해 크로스체인 상호작용을 하는 사용자는 일반적으로 뒤에서 일어나는 변화를 느낄 수 있습니다. 영지식(Zero Knowledge) 증명의 특성을 강조하기 위해 영지식(Zero Knowledge) 증명과 관련된 일부 정보를 프런트엔드에 표시할 수 있습니다:


        1.	메신저가 zk 증명 요청을 제출하면 프런트엔드에 다음과 같은 알림 메시지가 표시될 수 있습니다: "크로스체인 zk-증명 요청이 증명자에게 제출되었습니다."와 같은 알림 메시지를 표시합니다.


        2.	메신저가 zk-증명 요청을 받으면 프런트엔드에 다음과 같은 알림 메시지가 표시될 수 있습니다: "zk-proof가 획득되었습니다."


        3.	메신저가 블록 헤더, zk-proof, mpt-proof가 포함된 트랜잭션을 제출하면 프런트엔드에 메시지가 표시됩니다: "zk-증명 및 교차 체인 요청이 대상 체인에 제출되었습니다."라는 메시지가 표시됩니다.

세 번째 단계의 트랜잭션이 패키징되면 프런트엔드에서 다음과 같은 메시지를 표시할 수 있습니다: "대상 체인에서 zk 증명 및 교차 체인 요청을 처리했습니다.


## **비트코인 네트워크를 통한 MAP 프로토콜 네트워크 보안을 더욱 강화.**

장거리 공격은 지분 증명(PoS) 시스템을 겨냥한 공격의 한 유형입니다. 공격자는 블록체인의 초기 기록부터 시작하여 포크된 체인을 생성하려고 시도합니다. 이 공격이 성공하면 체인의 권위 있는 기록이 재정의되어 이중지불 문제가 발생하거나 네트워크 신뢰가 약화될 수 있습니다. 릴레이 체인 구조에서는 네트워크 내 여러 독립적인 블록체인 간의 상호작용을 조정하는 경우가 많기 때문에 이 문제가 특히 중요합니다. 릴레이 체인이 장거리 공격을 받으면 신뢰와 통신의 기반이 되는 모든 체인에 영향을 미칠 수 있습니다.

엄청난 연산 능력을 갖춘 비트코인은 자연스러운 신뢰의 원천으로 간주될 수 있으며 작업 증명이 지원하는 타임스탬프 서버 역할을 합니다. 비트코인은 이벤트에 대해 되돌릴 수 없는 시간 순서를 제공합니다. 네이티브 애플리케이션에서 이벤트는 비트코인 원장에서 실행되는 다양한 트랜잭션을 포함합니다. 다른 블록체인의 보안을 강화하기 위한 현재 애플리케이션에서 비트코인은 다른 블록체인에서 발생하는 이벤트의 타임스탬프를 찍는 데에도 사용될 수 있습니다. 이러한 각 이벤트는 채굴자에게 트랜잭션을 전송하고, 채굴자는 이를 비트코인 원장에 삽입하여 이벤트에 타임스탬프를 찍습니다. 이벤트에 타임스탬프를 찍는 트랜잭션을[ 체크포인트라고](https://bitcoin.stackexchange.com/questions/1797/what-are-checkpoints) 합니다.

체크포인트는 사용 불가능한 비트코인 트랜잭션에 임의의 80바이트 데이터를 게시할 수 있는 비트코인의 OP_RETURN 옵코드를 사용해 구현할 수 있습니다. 각 체크포인트에는 확인하려는 PoS 블록의 해시(32바이트)와 해당 블록을 확정하는 서명(각각 32바이트)이 최소한 포함되어야 합니다. 여기서 해시는 체크포인트되는 PoS 블록을 식별하는 데 사용되며, 서명은 공격자가 임의의 해시를 전송하고 비트코인에서 PoS 블록을 체크포인트하는 것처럼 가장하는 것을 방지하기 위해 필요합니다.

지분 증명(PoS) 체인은 비트코인 타임스탬프 서비스의 기능을 활용해 보안을 강화하고 장거리 공격 문제를 해결할 수 있습니다. MAPO 플랫폼은 정기적으로(매 에포크마다) 각 에포크의 마지막 블록의 해시와 서명을 비트코인 네트워크에 체크포인트로 제출합니다. 이러한 체크포인트는 블록의 해시와 블록의 최종성을 위해 서명한 검증자 2/3 세트의 서명과 에포크 번호 및 비트맵 번호에 해당하는 단일 집계된 BLS 서명으로 구성됩니다.

그 결과, MAPO 클라이언트는 비트코인 네트워크에서 체크포인트를 검색하여 MAP 프로토콜 PoS 체인의 최종 정식 체인을 결정할 수 있으므로, MAP 프로토콜 네트워크에서 악의적인 검증자의 장거리 공격으로부터 보호할 수 있습니다.


## **MAP 옴니체인 서비스(MOS) 계층**

MOS 계층에는 메신저, 볼트(Vault) 및 데이터, 기타 크로스체인 메시지 구성 요소가 포함됩니다.



![alt_text](/images/article/images/whitepaper-6.png "image_tooltip")




### **메신저(Messenger)**

메신저는 독립적인 체인 간 프로그램입니다. 프로그램에 미리 설정된 관련 이벤트를 수신하고 소스 체인의 원장에 증명을 구축한 다음, 이벤트 메시지와 증명을 타겟 체인의 볼트(Vault) 또는 데이터로 전송합니다.

메신저는 MAP 프로토콜 네트워크와 타겟 체인에 가스비를 선불로 지불하지만, 타겟 체인의 가스비는 추정할 수 없기 때문에 메신저에 대한 보상은 디앱에서 제공합니다. 애플리케이션의 유연성은 메신저에 수많은 가능성을 제공합니다. 애플리케이션은 옴니체인 사용자로부터 맞춤형 거래 수수료를 징수할 수 있으며, 결과적으로 메신저에 보상을 제공할 수 있습니다. MOS의 주요 구성 요소인 메신저 SDK는 dApp 개발자들에게 완전히 개방되어 있습니다.

메신저는 높은 동시성을 가진 체인 간 프로그램입니다. 이론적으로 하나의 정직한 메신저가 체인 사이에서 작동하는 한, 디앱의 모든 크로스체인 트랜잭션 메시지는 전송될 수 있습니다. 메신저의 악의적인 공격은 자산 손실로 이어지지는 않지만 프로토콜 레이어에서 MAP 프로토콜의 크로스 체인 검증을 실패하게 만들 수 있습니다.


### **볼트(Vault) 및 데이터**


### 소스 체인에서 볼트(Vault) 및 데이터 컨트랙트는 자산이나 데이터를 수신하고 메신저가 수신할 이벤트를 트리거하는 역할을 담당합니다. 릴레이 체인 또는 타겟 체인에서 볼트(Vault) 및 데이터 컨트랙트는 메신저가 보낸 크로스 체인 메시지를 수신하고 릴레이 체인/타겟 체인에 배포된 소스 체인의 라이트 클라이언트에 요청을 전달할 책임이 있습니다. 검증이 완료되면 볼트(Vault)와 데이터는 해당 명령을 실행합니다.


## **MAP 프로토콜 애플리케이션 레이어**


## 옴니체인 디앱을 구축할 때는 먼저 자산 크로스체인과 크로스체인 메시징이 어떻게 이루어지는지 알아야 합니다. 자세한 내용은 아래와 같습니다.


### **자산 크로스 체인**

P2P 자산 크로스체인 흐름은 다음과 같습니다:



![alt_text](/images/article/images/whitepaper-7.png "image_tooltip")





1. 볼트(Vault) 크로스체인 스마트 컨트랙트(MOS 구성 요소)는 자산을 받습니다.
2. 볼트(Vault) 컨트랙트는 원본 체인 주소, 대상 체인 주소, 토큰 유형, 금액이 포함된 정보를 메신저로 전송합니다.
3. 이 이벤트를 감지하고 진위 여부를 확인하기 위해, 메신저는 이 이벤트가 오리진 체인(Origin Chain)에 기록되었다는 증거를 만들어야 합니다. 메신저는 이 요청을 릴레이 체인의 볼트(Vault) 컨트랙트에 전달합니다.
4. 볼트(Vault) 컨트랙트는 이 요청의 진위 여부를 오리진 체인(Origin Chain)에서 릴레이 체인에 배포된 라이트 클라이언트 스마트 컨트랙트로 넘깁니다.
5. 라이트 클라이언트 스마트 콘트랙트는 오리진 체인(Origin Chain)의 가장 긴 체인 블록 헤더 정보를 저장하며, 트랜잭션이 실제로 오리진 체인(Origin Chain)에서 발생했는지 여부를 확인할 수 있습니다.
6. 볼트(Vault) 콘트랙트는 릴레이 체인에서 크로스 체인 요청 자산의 릴레이 체인 버전과 동등한 양의 릴레이 체인을 채굴합니다.
7. 볼트(Vault) 콘트랙트는 발행된 자산을 소멸시킵니다. 6단계와 7단계는 릴레이 체인에 장부를 기록하는 단계로, 자산이 발행된 후 소멸됩니다.
8. 메신저는 릴레이 체인에서 이벤트를 수신하고 릴레이 체인에 기록되는 이 트랜잭션의 증명을 구성합니다.
9. 그런 다음 메신저는 메시지를 대상 체인의 볼트(Vault) 컨트랙트로 전달합니다.
10. 1볼트(Vault) 콘트랙트는 크로스 체인 요청을 대상 체인에 배포된 릴레이 체인의 라이트 클라이언트 스마트 콘트랙트에 제출하여 검증을 받습니다.
11. 라이트 클라이언트의 확인 통과 명령을 받으면 볼트(Vault) 콘트랙트는 오리진 체인(Origin Chain) 스마트 콘트랙트가 지정한 대상 체인 주소로 토큰을 릴리스합니다.


### **크로스 체인 메시징**

크로스체인 메시징은 스마트 컨트랙트의 상호 운용성을 의미합니다. 단계는 자산 크로스체인과 유사합니다.

![alt_text](/images/article/images/whitepaper-8.png "image_tooltip")

서로 다른 체인에 있는 스마트 콘트랙트의 구성 가능성은 사용자나 스마트 콘트랙트가 어떤 토큰을 사용하거나 어떤 체인에 있든 상관없이 다른 체인의 탈중앙화 금융 상품과 상호작용하고 P2P 방식으로 원래의 체인에 있는 자산을 반환할 수 있게 하여 탈중앙화 금융 효율성을 더욱 향상시킬 수 있습니다.


# **MAP 프로토콜 토큰노믹스**

옴니체인 인프라로서 MAP 프로토콜은 모든 사람이 동등하게 참여할 수 있는 개방형 경제를 구축하고 생태계 운영, 성장 이니셔티브 및 전략적 투자를 위해 최선을 다하고 있습니다. 많은 퍼블릭 블록체인 프로젝트는 노드 운영자에게만 인센티브를 제공하는 화폐 시스템을 가지고 있습니다. MAP 프로토콜의 토큰노믹스는 더 다양한 참여자들의 보다 다양한 형태의 기여를 보상하도록 설계되었으며, 블록체인 노드를 유지하는 것 외에도 미래 성장 이니셔티브와 전략적 투자 프로젝트를 위한 지속적인 자원을 조달하기 위한 인센티브 구조가 내장되어 있습니다.


## **할당 및 분배**



![alt_text](/images/article/images/whitepaper-9.png "image_tooltip")

MAPO의 총 공급량은 100억 개입니다. 맵 프로토콜의 토큰 배분은 맵 프로토콜 네트워크의 블록 생성, 네트워크 유지, 생태계 개발 및 커뮤니티 성장에 대한 인센티브에 따라 이루어집니다. 자세한 분배와 정해진 비율은 다음과 같습니다:



* 15%는 MAP 프로토콜 개발자를 위한 것으로, 2019년부터 2025년까지 유효합니다.
* 21%는 생태계 DAO를 위한 것으로, 잠겨 있지 않으며 토큰의 사용 방법에 대해 MAPO 커뮤니티에서 완전히 결정합니다. 맵다오 거버넌스의 경우, 커뮤니티 구성원에게 영향을 미칠 수 있는 모든 주요 결정은 맵 포럼에서 충분히 논의된 후 온체인 투표를 거쳐야 합니다.
* 12%는 MAP 프로토콜 생태계와 웹3 옴니체인 생태계가 완전히 탈중앙화되기 전 초기 상태를 구축하기 위한 MAP 재단에 사용됩니다.
* 22%는 투자자 및 초기 후원자를 위한 것입니다.
* 30%는 MAP 프로토콜 네트워크의 검증자 및 유지 관리자를 위한 채굴 보상입니다.


## **수수료 모델**

맵 프로토콜은 각 크로스 체인 트랜잭션에 대해 맵 프로토콜 네트워크에서 생성된 가스 수수료만 청구합니다. 유지 관리자는 라이트 클라이언트를 업데이트하고 유지 관리하여 MAP 프로토콜로부터 추가 보상을 받을 수 있습니다.

인터체인 프로그램인 메신저는 MOS의 필수적인 부분입니다. 메신저는 옴니체인 사용자를 위해 MAP 프로토콜 네트워크와 타겟 체인의 가스비를 선불로 지불해야 합니다. 타겟 체인에 대한 수수료는 추정할 수 없으므로 MAP 프로토콜은 개발자에게 메신저 SDK를 제공합니다. 애플리케이션 레이어는 dApp 개발자가 크로스 체인 거래 수수료 기준, 메신저에 대한 보상 및 진입 요건을 결정할 수 있는 유연성을 제공합니다.

각 체인에 배포된 볼트(Vault) & 데이터는 각 체인의 자산(대체 가능한 토큰 및 대체 불가능한 토큰)과 데이터 관리를 담당하는 맵 옴니체인 서비스(MOS) 레이어의 필수 부분이기도 합니다. 볼트(Vault) 및 데이터 개발자에게 MOS는 어떠한 수수료도 부과하지 않습니다. 애플리케이션은 재량에 따라 볼트(Vault)와 데이터 풀의 유동성 공유에 대한 수수료 구조를 결정할 수 있습니다.


## **향후 15년 내 예상 잠금 해제 일정**




![alt_text](/images/article/images/whitepaper-10.png "image_tooltip")


잠금 해제된 토큰(즉, 유통이 가능한 토큰)과 잠금된 토큰(즉, 유통이 불가능한 토큰) 모두 스테이킹할 수 있습니다. 향후 15년간 예상되는 총 유통 토큰 공급량은 네트워크 성능과 스테이킹 가정에 따라 달라질 수 있습니다.


# **커뮤니티 회원이 참여하고 수익을 얻는 방법**

맵 프로토콜의 각 계층은 커뮤니티 구성원이 참여할 수 있는 기회를 제공합니다.


## **프로토콜 계층**



* 노드를 실행하고 검증자가 되어보세요: 검증자는 MAP 프로토콜 네트워크의 기반입니다. 커뮤니티 멤버는 일정 금액의 $MAPO를 스테이킹하고 필요한 연산 능력을 갖춘 노드를 운영할 수 있습니다. 커뮤니티 멤버는 $MAPO를 검증 노드 운영자에게 위임할 수도 있습니다.
* 유지관리자가 되세요: 유지관리자의 가치는 대상 체인에 배포된 라이트 클라이언트의 상태를 업데이트하여 검증 네트워크의 원활한 운영을 보장하는 데 있습니다. 유지관리자가 라이트 클라이언트를 업데이트하면 체인에 트랜잭션을 기록해야 하며, 가스비가 발생합니다. 따라서 MAP 프로토콜의 경제 모델에는 유지관리자에게 인센티브를 제공하고 보상하기 위해 설계된 별도의 구성 요소가 포함되어 있습니다. 유지관리자로 운영하려면 계산 능력, 대상 체인에서 가스 수수료를 선결제할 수 있는 충분한 현금 흐름, 그리고 $MAPO 스테이킹이 필요합니다.


## **맵 옴니체인 서비스(MOS) 레이어**



* 유동성 공급자가 되세요: 커뮤니티 구성원은 MAP 프로토콜 생태계 내에 배포된 디앱을 통해 각 체인에 있는 볼트(Vault)에 유동성을 제공할 수 있습니다. 각 디앱은 자체 인센티브 모델을 설계합니다.
* 메신저 실행: 메신저를 실행하려면 MAP 프로토콜 네트워크($MAPO)와 대상 체인(네이티브 토큰)에 충분한 가스비를 제공해야 합니다. 각 디앱은 인센티브 체계를 설정합니다.


## **애플리케이션 레이어**



* 디앱 개발자가 되세요: MAP 프로토콜에서 제공하는 완전한 SDK 세트를 통해 dApp 개발자는 다양한 크로스체인 애플리케이션을 구축할 수 있습니다.


# **MAP 프로토콜 사용 사례 예시**


## **옴니체인 토큰 발행**

프로젝트가 토큰을 발행할 때 여러 체인에 걸쳐 단편적으로 발행하는 경우가 많기 때문에 사용자는 외부 브릿지를 통해 복잡한 크로스 체인 거래소를 탐색해야 합니다. 하지만 MAP 프로토콜을 사용하면 프로젝트는 토큰 발행 초기에 옴니체인 커버리지를 달성할 수 있으며, 서로 다른 체인의 원장이 자동으로 정렬됩니다.

크로스 체인 메시징을 통해 본질적인 크로스 체인 거래소 상호 운용성이 실현됩니다. 사용자는 여러 체인이 존재한다는 사실을 인지하지 못할 수 있지만, 실제로는 여러 체인을 포괄합니다. 이러한 사용자 경험은 해외 및 국내 통화 사용과 유사합니다.


## **옴니체인 대출**

사용자가 체인 A에 자금을 보유하고 있지만 체인 B에서 채굴하려면 일반적으로 9단계를 거쳐야 하며, 각 단계에는 마찰 비용이 발생합니다. A 체인에서 담보 → 대출 → 브릿지(수수료) → 스왑(수수료) → 대상 체인에서 파밍 → 스왑백(수수료) → 브릿지백(수수료) → 대출금 상환 → 담보 해제.

MAP 프로토콜을 통해 사용자는 체인 A에 직접 담보를 설정하고, 대상 체인에서 차입, 채굴, 상환, 담보 해제를 완료하여 4번의 크로스 체인 브릿지 및 교환 수수료를 건너뛸 수 있습니다.


## **옴니체인 스왑**

옴니체인 스왑은 사용자를 최고의 크로스체인 탈중앙 금융 프로토콜에 연결해 기존 탈중앙 금융 거래소보다 훨씬 낮은 수수료로 코인을 교환할 수 있게 해줍니다. 개발자는 MAP 프로토콜을 사용해 사용자가 모든 체인의 모든 토큰을 교환할 수 있는 진정한 탈중앙화 P2P 옴니체인 거래소를 구축할 수 있습니다.

옴니체인 스왑은 모든 주요 DEX 유동성을 연결하여 옴니체인 스왑 집계를 달성합니다. 기존 AMM을 래핑하여 기존 코드를 수정할 필요 없이 한 자산에서 다른 자산으로 옴니체인 스왑을 달성할 수 있습니다. 사용자는 소스 체인에서 단 한 번의 트랜잭션으로 이더리움의 이더($ETH)에서 니어 프로토콜의 니어($NEAR)로 스왑할 수 있습니다.

MAP 프로토콜로 구축된 옴니체인 스왑에서 사용자는 하나의 풀에 멀티체인 코인 유동성을 추가할 수 있으며, 이는 다른 체인의 토큰 쌍에 유동성을 제공하는 것이 가능해짐을 의미합니다. 사용자는 스테이블코인과 같은 중간 토큰을 사용하지 않고도 한 토큰을 다른 체인의 다른 토큰으로 직접 교환할 수 있으므로 옴니체인 스왑의 최단 경로를 이용할 수 있습니다.

사용자가 모든 체인의 토큰을 교환할 수 있는 최초의 진정한 탈중앙화 크로스체인 거래소인 버터 스왑은 위의 모든 기능을 포함하며 2023년 3월 30일에 공식 출시됩니다.


## **옴니체인 및 완전 온체인 게임**

암호화폐 산업과 메타버스의 개념이 부상하면서 많은 혁신적인 아이디어가 전통적인 게임의 영역으로 들어왔습니다. 게임파이란 수익 창출 기회를 제공하는 암호화폐 게임 참여를 통해 수익을 창출하는 금융 시스템의 게임화를 말합니다. 기존 게임과 달리 플레이 투 언 게임은 플레이어가 보상을 획득하도록 인센티브를 제공합니다. 플레이어는 게임 내 자산을 생성하고 이에 대한 완전한 소유권을 가질 수 있습니다.

옴니체인 및 완전 온체인 게임은 크로스체인을 넘어 프론트엔드(플레이어가 화면에 표시되는 게임 부분)를 제외한 게임의 모든 부분이 블록체인 기술만을 사용하여 실행되는 것을 의미합니다. 게임 개발을 위한 내러티브와 거버넌스 역시 DAO를 기반으로 탈중앙화될 것입니다.

MAP 프로토콜은 다양한 유형의 블록체인을 교차 체인화하고 상호 운용할 수 있도록 지원합니다. MAP 프로토콜을 통해 GameFi 프로젝트는 EVM과 비 EVM에 연결할 수 있을 뿐만 아니라 스토리지와 컴퓨팅을 온체인에 배치할 수도 있습니다. 또한, MAP 프로토콜 네트워크는 모든 유형의 체인과 적극적으로 연결되기 때문에 GameFi 프로젝트는 확장성 및 보안 문제에 대한 걱정 없이 사용자 경험 향상에 전적으로 집중할 수 있습니다.


## **온체인 데이터: 온체인 오라클 및 파생상품** \
탈중앙화 파생상품과 합성자산은 일반적으로 다른 체인에서 발생하는 자산 가격과 수량의 정확성과 적시성에 제약을 받습니다. 이러한 문제는 멀티체인 배포를 통해 해결할 수 있지만, 이는 매우 복잡합니다.

MAP 프로토콜은 신뢰할 수 있는 옴니체인 네트워크를 구축함으로써 데이터 크로스체인을 가능하게 하고 완전히 새로운 오라클 시장인 온체인 오라클을 육성하고 있습니다. MAP 프로토콜 네트워크에 배포함으로써 파생 및 합성 자산 애플리케이션은 온체인 오라클에서 신뢰할 수 있는 멀티체인 데이터를 쉽게 획득할 수 있습니다.


## **옴니체인 거버넌스 -- Aave**

에이브가 제안을 실행하면(이더리움 네트워크에서 설정됨), 제안은 폴리곤(MATIC) FxPortal로 전달됩니다. 그 후, 이 메커니즘은 이더리움에서 데이터를 읽고 검증을 위해 폴리곤 네트워크로 전달합니다. 이후 에이브의 크로스체인 거버넌스를 위한 브리징 컨트랙트는 이 데이터를 받아 파싱한 후 다음 단계로 넘어가기 위해 대기열에 대기하며 최종 마무리를 위해 타임록을 대기합니다.

에이브 크로스체인 거버넌스 브리지는 EVM과 크로스체인 메시징을 지원하는 모든 체인에서 작동하도록 쉽게 조정할 수 있도록 일반적인 방식으로 구축되었습니다. 현재 이 저장소는 폴리곤과 아비트럼에 대한 컨트랙트 브리징을 지원합니다. 에이브에서 사용자는 에이브 개선 프로토콜, 즉 AIP를 제출하여 디파이 플랫폼의 다양한 기능을 타겟팅할 수 있습니다.

이 솔루션은 상당히 포괄적인 것처럼 보이지만, MAP 프로토콜의 옴니체인 상호운용성을 통해 Aave의 거버넌스는 모든 EVM과 이기종 체인에서 옴니체인 관리를 달성할 수 있습니다.


## **대체 가능 토큰과 NFT 브릿지**

크로스 체인 브리지와 크로스 체인 NFT 브리지는 더 이상 인프라를 구축하거나 MPC를 사용할 필요가 없습니다. 브리지 개발자는 MAP 프로토콜의 P2P 크로스체인 검증 네트워크와 MOS 애플리케이션 개발자 서비스 키트를 사용해 NFT 또는 대체 가능한 토큰 브리지 애플리케이션을 쉽게 구축할 수 있습니다.


## **AIGC + Web3**

사용자가 AIGC 서비스와 상호작용할 때 생성되는 AI 데이터는 탈중앙화된 스토리지 레이어 1(L1)에 저장될 수 있습니다. 그러나 이러한 데이터를 자산으로 거래할 수 있으려면 탈중앙화 L1이 필요하며, 이를 위해서는 탈중앙화 금융 시장이 활성화되어 있어야 합니다. P2P 크로스체인 메시징을 통해 사용자가 생성한 AI 데이터를 자산으로 거래하는 것이 가능해질 것입니다.


## **BRC-20 자산 유동성**

BRC-20은 비트코인 블록체인의 대체 가능한 토큰을 위한 실험적 표준으로, 비트코인 네트워크에 새겨져 있습니다. 맵 프로토콜은 비트코인 네트워크에서 맵 프로토콜 네트워크로 BRC-20 토큰을 P2P 방식으로 교차 체인 전송하는 것을 지원합니다. 이를 통해 다른 블록체인의 다른 암호화폐를 보다 편리하고 비용 효율적인 방식으로 BRC-20 자산으로 거래할 수 있어 인스크립션 자산의 유동성을 높일 수 있습니다. 이러한 상호운용성 계층은 비트코인 사용 사례를 확장하고 비트코인 생태계를 더 광범위한 암호화폐 기반 금융 생태계로 통합하여 비트코인 커뮤니티에 새로운 기여를 가져다줍니다.


# **결론**

MAP 프로토콜은 비트코인 레이어 2이자 라이트 클라이언트와 영지식 기술을 기반으로 구축된 P2P 옴니체인 네트워크로, 체인 간 상호 운용성에 중점을 두고 있습니다. 이는 블록체인 기반 자산, 스토리지, 컴퓨팅 간의 상호운용성을 확보하기 위한 필수적인 옴니체인 인프라를 EVM과 비 EVM 체인에 걸쳐 제공합니다.

옴니체인 인프라로서 MAP 프로토콜은 크로스체인 통신을 위해 신뢰할 수 있는 제3자에 의존하지 않습니다. 유일한 신뢰는 코드에 있으며, 라이트 클라이언트의 자체 검증 특성을 활용하여 완전한 P2P 방식으로 크로스 체인 상호 작용을 보장합니다. 소스 체인에서 크로스 체인 요청이 발생하면 오프체인 역할을 통해 타겟 체인으로 전송됩니다. 그러면 소스 체인에 배포된 라이트 클라이언트는 오프체인 역할이 보낸 크로스 체인 요청의 유효성을 P2P 방식으로 검증합니다.

MAP 프로토콜의 보안은 비트코인 네트워크를 통해 더욱 강화됩니다. MAP 프로토콜 네트워크의 에포크 및 지분 증명(PoS) 합의와 같은 모든 관련 정보는 비트코인 블록체인에 트랜잭션으로 기록됩니다. 이는 릴레이 체인에 대한[ 장거리 공격을](https://messari.io/report/long-range-attack) 방지하고 비트코인 네트워크의 보안 메커니즘을 활용하여 릴레이 체인의 보안을 더욱 보장합니다.

MAP 프로토콜은 특정 사용 사례를 위한 폐쇄적인 일회용 프로토콜이 아닌, 유연하고 혁신적인 옴니체인 인프라이자 피어 투 피어(P2P) 크로스체인 상호운용성 및 웹 3.0 dApp 개발을 위한 플랫폼입니다. 기술 설계와 커뮤니티 개발 측면에서 개방적이며, 많은 새로운 금융 및 비금융 프로토콜의 기반이 되기를 기대합니다.