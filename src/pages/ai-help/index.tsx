import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import Header from '../../components/header'
import Footer from '@/components/footer'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './index.module.css'
type Props = {}
import Image from 'next/image'
import axios from 'axios'

export default function AiHelp(
    _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const [chatCard, setChatCard] = useState<any[]>([])
    const [inputValue, setInputValue] = useState("")
    const scrollRef = useRef(null);

    const [loading, setLoading] = useState(false)
    const useIsomorphicLayoutEffect =
        typeof window !== 'undefined' ? useLayoutEffect : useEffect;
    useIsomorphicLayoutEffect(() => {
        const scrollDiv = scrollRef.current;

        if (scrollDiv) {
            //@ts-ignore
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
        }
    }, [chatCard]); // 添加你的数据作为依赖
    useEffect(() => {

        if (localStorage.getItem("chatContent")) {
            setChatCard(JSON.parse(localStorage.getItem("chatContent") as string))


        }
    }, [])

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            sendMessage()
        }
        localStorage.setItem("chatContent", "")

    }
    const clear = () => {
        setChatCard([])

    }
    const sendMessage = () => {
        if (!inputValue || loading)
            return
        setLoading(true)
        const _chatCard = chatCard
        _chatCard.push({
            content: inputValue,
            type: 1
        }, {
            content: "",
            type: 0
        })

        setChatCard(_chatCard)
        setInputValue("")

        let data = {
            "inputs": {},
            "query": inputValue,
            "response_mode": "blocking",
            "conversation_id": "",
            "user": ""
        };

        axios.post('https://bnb-reiki.web3go.xyz/ai/v1/chat-messages', data, {
            headers: {
                'Authorization': 'Bearer app-JRw4sfejfWmhlSK4PX9lrBdI',
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                _chatCard[_chatCard.length - 1].content = result.data.answer
                setChatCard([..._chatCard])
                setLoading(false)

                localStorage.setItem("chatContent", JSON.stringify(_chatCard))

                console.log(result.data)
            })
            .catch(err => {
                _chatCard[_chatCard.length - 1].content = err.message || 'error'
                setChatCard([..._chatCard])
                setLoading(false)

                console.log(err)
            });


    }

    const inputChange = (e: any) => {
        setInputValue(e.target.value)
    }
    return (
        <>
            <Header />

            <div className={styles.main}>
                <div className={styles.title}>MAP Protocol AI Assistant</div>
                <div className={styles.chatContent}>
                    <div ref={scrollRef} className={styles.chatCards}>
                        {chatCard.map((item,index) => <div key={index} className={styles.chatCard}
                            style={{
                                justifyContent: item.type == 0 ? 'start' : 'end'
                            }}>
                            <div className={item.type == 0 ? styles.aiChatCard : styles.userChatCard}

                            >
                                {item.content ? item.content : <div className={styles.loader}></div>}
                            </div>
                        </div>)
                        }

                    </div>
                    <div className={styles.buttom}>
                        <div
                            onClick={clear}
                            className={styles.clear}>
                            <Image
                                width={32}
                                height={32}
                                src="/images/clear.png"
                                alt="" /></div>
                        <input type="text"
                            onChange={inputChange}
                            onKeyDown={handleKeyDown}
                            value={inputValue}
                            className={styles.input} >
                        </input>
                        <div
                            onClick={
                                sendMessage
                            } className={styles.send}>
                            <Image
                                width={36}
                                height={36}

                                className={styles.sendButton}
                                src="/images/send.jpg"
                                alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <iframe
                    src="https://bnb-reiki.web3go.xyz/aiweb/chatbot/4vdiUIU1cOZFXQwQ"
                    style={{ width: "100%", height: "100%", minHeight: "700px" }}
                    frameBorder="0"
                    allow="microphone">
                </iframe>
            </div> */}
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['community', 'common'])),
    },
})