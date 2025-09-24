export const LOADING_MESSAGES: string[] = [
    "Contacting the digital director...",
    "Script is being written by the AI...",
    "Casting virtual actors...",
    "Setting up the digital cameras...",
    "Rendering scene 1...",
    "This can take a few minutes, please wait.",
    "Adding special effects and VFX...",
    "Composing an original soundtrack...",
    "Finalizing color grading...",
    "Polishing the final cut...",
    "Almost there, the premiere is about to start!"
];

interface ExampleVideo {
    prompt: string;
    url: string;
}

export const EXAMPLE_VIDEOS: ExampleVideo[] = [
    {
        prompt: "A majestic lion surveying its kingdom from a high rock at sunrise.",
        url: "https://assets.mixkit.co/videos/preview/mixkit-a-lion-in-the-savanna-at-sunset-4183-large.mp4"
    },
    {
        prompt: "Drone footage of a winding road through a dense, foggy forest.",
        url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-road-in-the-middle-of-the-forest-4113-large.mp4"
    },
    {
        prompt: "Close up of a programmer's hands typing code on a keyboard.",
        url: "https://assets.mixkit.co/videos/preview/mixkit-man-typing-on-a-keyboard-4082-large.mp4"
    },
    {
        prompt: "A beautiful beach with waves crashing on the shore during a golden sunset.",
        url: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4"
    },
     {
        prompt: "A chef meticulously preparing a gourmet dish in a high-end kitchen.",
        url: "https://assets.mixkit.co/videos/preview/mixkit-chef-applies-a-glaze-on-a-finished-dish-4212-large.mp4"
    },
    {
        prompt: "A bustling city street at night with neon lights and traffic.",
        url: "https://assets.mixkit.co/videos/preview/mixkit-a-time-lapse-of-a-city-at-night-4240-large.mp4"
    }
];

export interface ExampleImage {
    prompt: string;
    url: string;
}

export const EXAMPLE_IMAGES: ExampleImage[] = [
    {
        prompt: "A photorealistic astronaut riding a horse on Mars.",
        url: "https://picsum.photos/seed/mars_astronaut/1024/768"
    },
    {
        prompt: "A whimsical castle made of candy in a vibrant, sugary landscape.",
        url: "https://picsum.photos/seed/candy_castle/1024/768"
    },
    {
        prompt: "A neon-lit cyberpunk city street at night, with flying cars.",
        url: "https://picsum.photos/seed/cyberpunk_city/1024/768"
    },
    {
        prompt: "An ancient, moss-covered robot meditating in a tranquil forest.",
        url: "https://picsum.photos/seed/forest_robot/1024/768"
    },
    {
        prompt: "A surreal painting of a giant whale swimming through the clouds.",
        url: "https://picsum.photos/seed/sky_whale/1024/768"
    },
    {
        prompt: "A detailed close-up of a dragon's eye, with fire reflected within.",
        url: "https://picsum.photos/seed/dragon_eye/1024/768"
    }
];