const products = {
    "baymax-chat": {
        imageUrl: "/baymax-chat.png",
        imageAlt: "Baymax Research Project image idea created by MidJourney AI.",
        title: "BayMax as Friend",
        description:
            "An experimental evaluation of using a trained and fine-tuned GPT-2 model for enhancing positive emotion in chatbot-based conversations.",
        link: "/chat",
    },
    "baymax-protector": {
        imageUrl: "/baymax.png",
        imageAlt: "Baymax Research Project image idea created by MidJourney AI.",
        title: "BayMax as Protector",
        description:
            "Using GPT to filter negative/low-empathetic online comments, converting them into positive/human ones to improve positive emotions in online interactions.",
        link: "/protector",
    },
};

const mockData = [
    {
        id: "ads81243-1",
        author: "John Doe",
        content:
            "My diet becomes fucked when i get depressed.. I can't control myself in the grocery store when I'm feeling down. Chips, cookies, soda, cake, you name It. Anyone else a stress eater?",
        avatar: "https://joeschmoe.io/api/v1/random",
        replies: [
            {
                id: "ads81243-1-1",
                author: "John Wick",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "By any chance do you think you're in a loop. Junk food can make you depressed. And being depressed probably makes you eat more junk food? For a while that was my problem too.",
            },
        ],
    },
];

const convertDataToJson = (data) => {
    let jsonData = {};
    data.map((item) => {
        jsonData["seeker"] = item.content;
        jsonData["replies"] = item.replies.map((reply) => reply.content);
        return jsonData;
    });
    return jsonData;
};

export { products, mockData, convertDataToJson };
