

interface Translation {
    [key: string]: {
        header: {
            navLinks: string[];
            signIn: string;
            tryForFree: string;
        };
        sidebar: {
            home: string;
            title: string;
            video: string;
            image: string;
            assets: string;
            gallery: string;
            admin: string;
        };
        hero: {
            titleStart: string;
            titleGradient: string;
            placeholder: string;
            buttonText: string;
            buttonLoadingText: string;
            buttonTextAuthRequired: string;
            imageUploadTooltip: string;
        };
        imageGenerator: {
            title: string;
            subtitle: string;
            placeholder: string;
            buttonText: string;
            buttonLoadingText: string;
            loadingMessage: string;
            settingsTitle: string;
            aspectRatio: string;
            aspectRatioOptions: { [key: string]: string };
            numberOfImages: string;
            buttonTextAuthRequired: string;
        };
        imageCreation: {
            pageTitle: string;
            placeholder: string;
            characterCount: string;
            referenceCharacter: string;
            model: string;
            quantity: string;
            favorites: string;
            creationType: string;
            subscribeBanner: string;
            subscribeButton: string;
            noGenerations: string;
            viewGuide: string;
        },
        gallery: {
            title: string;
            subtitle: string;
            filters: {
                all: string;
                videos: string;
                images: string;
            };
        };
        videoResult: {
            title: string;
            downloadButton: string;
            narrationButtonPlay: string;
            narrationButtonStop: string;
        },
        videoPreviewModal: {
            title: string;
            promptLabel: string;
            saveButton: string;
            downloadButton: string;
        },
        imageResult: {
            title: string;
            downloadButton: string;
        },
        assetsView: {
            title: string;
            subtitle: string;
            noAssetsTitle: string;
            noAssetsMessage: string;
            deleteButton: string;
            downloadButton: string;
        },
        adminView: {
            title: string;
            subtitle: string;
            totalUsers: string;
            table: {
                email: string;
                registeredAt: string;
            };
            noUsers: string;
        };
        error: {
            title: string;
            prefix: string;
            imagePrefix: string;
        },
        footer: {
            copyright: string;
            links: string[];
        };
        auth: {
            login: string;
            signUp: string;
            modalTitleLogin: string;
            modalTitleSignUp: string;
            emailLabel: string;
            passwordLabel: string;
            confirmPasswordLabel: string;
            loginButton: string;
            signUpButton: string;
            switchToSignUp: string;
            switchToLogin: string;
            logout: string;
            welcome: string;
            orDivider: string;
            continueWithGoogle: string;
            continueWithGithub: string;
            modalTitleVerify: string;
            verifyInstructions: string;
            verificationCodeLabel: string;
            verifyButton: string;
            resendCode: string;
            invalidCode: string;
            demoCodeMessage: string;
        };
    };
}

export const translations: Translation = {
    en: {
        header: {
            navLinks: ["Products", "Solutions", "Enterprise", "Resources", "Company"],
            signIn: "Sign In",
            tryForFree: "Try For Free",
        },
        sidebar: {
            home: "Home",
            title: "AI Creation",
            video: "Video",
            image: "Image",
            assets: "Assets",
            gallery: "Gallery",
            admin: "Admin",
        },
        hero: {
            titleStart: "Transform",
            titleGradient: "Idea to Visual",
            placeholder: "Type your idea and click \"Create\" to get a video",
            buttonText: "Create video",
            buttonLoadingText: "Generating",
            buttonTextAuthRequired: "Login to Create",
            imageUploadTooltip: "Add image"
        },
        imageGenerator: {
            title: "Bring Your Imagination to Life",
            subtitle: "Describe any image you can think of, and our AI will create it for you in seconds.",
            placeholder: "e.g., An astronaut riding a horse on Mars, photorealistic",
            buttonText: "Generate Images",
            buttonLoadingText: "Creating {count}...",
            loadingMessage: "Creating your {count} image(s)...",
            settingsTitle: "Image Settings",
            aspectRatio: "Aspect Ratio",
            aspectRatioOptions: {
                '1:1': 'Square (1:1)',
                '16:9': 'Widescreen (16:9)',
                '9:16': 'Portrait (9:16)',
                '4:3': 'Landscape (4:3)',
                '3:4': 'Vertical (3:4)',
            },
            numberOfImages: "Number of Images",
            buttonTextAuthRequired: "Login to Generate",
        },
        imageCreation: {
            pageTitle: "Image Generation",
            placeholder: "Enter natural and coherent descriptions to unleash the power of image generation.",
            characterCount: "{count}/1250",
            referenceCharacter: "Add reference character",
            model: "Imagem-01",
            quantity: "Quantity",
            favorites: "Favorites",
            creationType: "Type: All creations",
            subscribeBanner: "Subscribe to enjoy fast access",
            subscribeButton: "Subscribe",
            noGenerations: "Generations will appear here",
            viewGuide: "View guide",
        },
        gallery: {
            title: "Explore What's Possible",
            subtitle: "See what others have created with Studio IA. The only limit is your imagination.",
            filters: {
                all: "All",
                videos: "Videos",
                images: "Images"
            }
        },
        videoResult: {
            title: "Your Generated Video",
            downloadButton: "Download Video",
            narrationButtonPlay: "Play Narration",
            narrationButtonStop: "Stop Narration",
        },
        videoPreviewModal: {
            title: "Video Ready",
            promptLabel: "Prompt:",
            saveButton: "Save to Assets",
            downloadButton: "Download",
        },
        imageResult: {
            title: "Your Generated Images",
            downloadButton: "Download",
        },
        assetsView: {
            title: "My Assets",
            subtitle: "All your generated videos and images in one place.",
            noAssetsTitle: "No Assets Yet",
            noAssetsMessage: "Start creating videos or images to see them here.",
            deleteButton: "Delete Asset",
            downloadButton: "Download Asset",
        },
        adminView: {
            title: "User Management",
            subtitle: "View and manage all registered users.",
            totalUsers: "Total Users",
            table: {
                email: "Email",
                registeredAt: "Registered At",
            },
            noUsers: "No users have registered yet.",
        },
        error: {
            title: "Error",
            prefix: "Failed to generate video.",
            imagePrefix: "Failed to generate images."
        },
        footer: {
            copyright: "© {year} Studio IA. All rights reserved.",
            links: ["Terms", "Privacy", "Contact"],
        },
        auth: {
            login: "Login",
            signUp: "Sign Up",
            modalTitleLogin: "Welcome back",
            modalTitleSignUp: "Create your account",
            emailLabel: "Email",
            passwordLabel: "Password",
            confirmPasswordLabel: "Confirm Password",
            loginButton: "Login",
            signUpButton: "Create Account",
            switchToSignUp: "Don't have an account? Sign Up",
            switchToLogin: "Already have an account? Login",
            logout: "Logout",
            welcome: "Welcome",
            orDivider: "OR",
            continueWithGoogle: "Continue with Google",
            continueWithGithub: "Continue with GitHub",
            modalTitleVerify: "Verify your email",
            verifyInstructions: "We've sent a 6-digit code to {email}. Please enter it below.",
            verificationCodeLabel: "Verification Code",
            verifyButton: "Verify & Create Account",
            resendCode: "Resend Code",
            invalidCode: "Invalid code. Please try again.",
            demoCodeMessage: "For demonstration, your code is: {code}",
        },
    },
    es: {
        header: {
            navLinks: ["Productos", "Soluciones", "Empresas", "Recursos", "Compañía"],
            signIn: "Iniciar Sesión",
            tryForFree: "Prueba Gratis",
        },
        sidebar: {
            home: "Inicio",
            title: "Creación de IA",
            video: "Video",
            image: "Imagen",
            assets: "Activos",
            gallery: "Galería",
            admin: "Admin",
        },
        hero: {
            titleStart: "Transformar",
            titleGradient: "Idea a Visual",
            placeholder: "Escribe tu idea y haz clic en \"Crear\" para obtener un video",
            buttonText: "Crear video",
            buttonLoadingText: "Generando",
            buttonTextAuthRequired: "Inicia Sesión para Crear",
            imageUploadTooltip: "Añadir imagen"
        },
        imageGenerator: {
            title: "Da Vida a Tu Imaginación",
            subtitle: "Describe cualquier imagen que puedas imaginar y nuestra IA la creará para ti en segundos.",
            placeholder: "Ej: Un astronauta montando a caballo en Marte, fotorrealista",
            buttonText: "Generar Imágenes",
            buttonLoadingText: "Creando {count}...",
            loadingMessage: "Creando tus {count} imagen(es)...",
            settingsTitle: "Ajustes de Imagen",
            aspectRatio: "Relación de Aspecto",
            aspectRatioOptions: {
                '1:1': 'Cuadrado (1:1)',
                '16:9': 'Panorámico (16:9)',
                '9:16': 'Retrato (9:16)',
                '4:3': 'Paisaje (4:3)',
                '3:4': 'Vertical (3:4)',
            },
            numberOfImages: "Número de Imágenes",
            buttonTextAuthRequired: "Inicia Sesión para Generar",
        },
        imageCreation: {
            pageTitle: "Generación de Imagen",
            placeholder: "Introduzca descripciones naturales y coherentes para liberar el poder de la generación de imágenes.",
            characterCount: "{count}/1250",
            referenceCharacter: "Añadir personaje de referencia",
            model: "Imagem-01",
            quantity: "Cantidad",
            favorites: "Favoritos",
            creationType: "Tipo: Todas las creaciones",
            subscribeBanner: "Suscríbete para disfrutar de un acceso rápido",
            subscribeButton: "Suscribirse",
            noGenerations: "Las generaciones aparecerán aquí",
            viewGuide: "Ver guía",
        },
        gallery: {
            title: "Explora lo que es Posible",
            subtitle: "Mira lo que otros han creado con Studio IA. El único límite es tu imaginación.",
            filters: {
                all: "Todo",
                videos: "Videos",
                images: "Imágenes"
            }
        },
        videoResult: {
            title: "Tu Video Generado",
            downloadButton: "Descargar Video",
            narrationButtonPlay: "Reproducir Narración",
            narrationButtonStop: "Detener Narración",
        },
        videoPreviewModal: {
            title: "Video Listo",
            promptLabel: "Prompt:",
            saveButton: "Guardar en Activos",
            downloadButton: "Descargar",
        },
        imageResult: {
            title: "Tus Imágenes Generadas",
            downloadButton: "Descargar",
        },
        assetsView: {
            title: "Mis Activos",
            subtitle: "Todos tus videos e imágenes generados en un solo lugar.",
            noAssetsTitle: "Aún no hay Activos",
            noAssetsMessage: "Comienza a crear videos o imágenes para verlos aquí.",
            deleteButton: "Eliminar Activo",
            downloadButton: "Descargar Activo",
        },
        adminView: {
            title: "Gestión de Usuarios",
            subtitle: "Ver y gestionar todos los usuarios registrados.",
            totalUsers: "Total de Usuarios",
            table: {
                email: "Correo Electrónico",
                registeredAt: "Fecha de Registro",
            },
            noUsers: "Aún no se han registrado usuarios.",
        },
        error: {
            title: "Error",
            prefix: "Error al generar el video.",
            imagePrefix: "Error al generar las imágenes."
        },
        footer: {
            copyright: "© {year} Studio IA. Todos los derechos reservados.",
            links: ["Términos", "Privacidad", "Contacto"],
        },
        auth: {
            login: "Iniciar Sesión",
            signUp: "Registrarse",
            modalTitleLogin: "Bienvenido de nuevo",
            modalTitleSignUp: "Crea tu cuenta",
            emailLabel: "Correo Electrónico",
            passwordLabel: "Contraseña",
            confirmPasswordLabel: "Confirmar Contraseña",
            loginButton: "Iniciar Sesión",
            signUpButton: "Crear Cuenta",
            switchToSignUp: "¿No tienes una cuenta? Regístrate",
            switchToLogin: "¿Ya tienes una cuenta? Inicia Sesión",
            logout: "Cerrar Sesión",
            welcome: "Bienvenido",
            orDivider: "O",
            continueWithGoogle: "Continuar con Google",
            continueWithGithub: "Continuar con GitHub",
            modalTitleVerify: "Verifica tu correo electrónico",
            verifyInstructions: "Hemos enviado un código de 6 dígitos a {email}. Por favor, ingrésalo a continuación.",
            verificationCodeLabel: "Código de Verificación",
            verifyButton: "Verificar y Crear Cuenta",
            resendCode: "Reenviar Código",
            invalidCode: "Código inválido. Por favor, inténtalo de nuevo.",
            demoCodeMessage: "Para demostración, tu código es: {code}",
        },
    },
    fr: {
        header: {
            navLinks: ["Produits", "Solutions", "Entreprise", "Ressources", "Société"],
            signIn: "Se Connecter",
            tryForFree: "Essai Gratuit",
        },
        sidebar: {
            home: "Accueil",
            title: "Création IA",
            video: "Vidéo",
            image: "Image",
            assets: "Actifs",
            gallery: "Galerie",
            admin: "Admin",
        },
        hero: {
            titleStart: "Transformer",
            titleGradient: "l'Idée en Visuel",
            placeholder: "Tapez votre idée et cliquez sur \"Créer\" pour obtenir une vidéo",
            buttonText: "Créer vidéo",
            buttonLoadingText: "Génération",
            buttonTextAuthRequired: "Connectez-vous pour Créer",
            imageUploadTooltip: "Ajouter une image"
        },
        imageGenerator: {
            title: "Donnez Vie à Votre Imagination",
            subtitle: "Décrivez n'importe quelle image à laquelle vous pouvez penser, et notre IA la créera pour vous en quelques secondes.",
            placeholder: "Ex: Un astronaute à cheval sur Mars, photoréaliste",
            buttonText: "Générer des Images",
            buttonLoadingText: "Création {count}...",
            loadingMessage: "Création de vos {count} image(s)...",
            settingsTitle: "Paramètres d'Image",
            aspectRatio: "Format d'Image",
            aspectRatioOptions: {
                '1:1': 'Carré (1:1)',
                '16:9': 'Large (16:9)',
                '9:16': 'Portrait (9:16)',
                '4:3': 'Paysage (4:3)',
                '3:4': 'Vertical (3:4)',
            },
            numberOfImages: "Nombre d'Images",
            buttonTextAuthRequired: "Connectez-vous pour Générer",
        },
        imageCreation: {
            pageTitle: "Génération d'Image",
            placeholder: "Saisissez des descriptions naturelles et cohérentes pour libérer la puissance de la génération d'images.",
            characterCount: "{count}/1250",
            referenceCharacter: "Ajouter un personnage de référence",
            model: "Imagem-01",
            quantity: "Quantité",
            favorites: "Favoris",
            creationType: "Type : Toutes les créations",
            subscribeBanner: "Abonnez-vous pour profiter d'un accès rapide",
            subscribeButton: "S'abonner",
            noGenerations: "Les générations apparaîtront ici",
            viewGuide: "Voir le guide",
        },
        gallery: {
            title: "Explorez les Possibilités",
            subtitle: "Découvrez ce que d'autres ont créé avec Studio IA. La seule limite est votre imagination.",
            filters: {
                all: "Tout",
                videos: "Vidéos",
                images: "Images"
            }
        },
        videoResult: {
            title: "Votre Vidéo Générée",
            downloadButton: "Télécharger la Vidéo",
            narrationButtonPlay: "Lire la Narration",
            narrationButtonStop: "Arrêter la Narration",
        },
        videoPreviewModal: {
            title: "Vidéo Prête",
            promptLabel: "Prompt :",
            saveButton: "Sauvegarder",
            downloadButton: "Télécharger",
        },
        imageResult: {
            title: "Vos Images Générées",
            downloadButton: "Télécharger",
        },
        assetsView: {
            title: "Mes Actifs",
            subtitle: "Toutes vos vidéos et images générées au même endroit.",
            noAssetsTitle: "Aucun Actif pour le Moment",
            noAssetsMessage: "Commencez à créer des vidéos ou des images pour les voir ici.",
            deleteButton: "Supprimer l'Actif",
            downloadButton: "Télécharger l'Actif",
        },
        adminView: {
            title: "Gestion des Utilisateurs",
            subtitle: "Voir et gérer tous les utilisateurs enregistrés.",
            totalUsers: "Nombre total d'utilisateurs",
            table: {
                email: "E-mail",
                registeredAt: "Date d'inscription",
            },
            noUsers: "Aucun utilisateur n'est encore enregistré.",
        },
        error: {
            title: "Erreur",
            prefix: "Échec de la génération de la vidéo.",
            imagePrefix: "Échec de la génération des images."
        },
        footer: {
            copyright: "© {year} Studio IA. Tous droits réservés.",
            links: ["Conditions", "Confidentialité", "Contact"],
        },
        auth: {
            login: "Se Connecter",
            signUp: "S'inscrire",
            modalTitleLogin: "Content de vous revoir",
            modalTitleSignUp: "Créez votre compte",
            emailLabel: "E-mail",
            passwordLabel: "Mot de passe",
            confirmPasswordLabel: "Confirmer le mot de passe",
            loginButton: "Se Connecter",
            signUpButton: "Créer un Compte",
            switchToSignUp: "Pas de compte ? Inscrivez-vous",
            switchToLogin: "Déjà un compte ? Connectez-vous",
            logout: "Déconnexion",
            welcome: "Bienvenue",
            orDivider: "OU",
            continueWithGoogle: "Continuer avec Google",
            continueWithGithub: "Continuer avec GitHub",
            modalTitleVerify: "Vérifiez votre e-mail",
            verifyInstructions: "Nous avons envoyé un code à 6 chiffres à {email}. Veuillez le saisir ci-dessous.",
            verificationCodeLabel: "Code de Vérification",
            verifyButton: "Vérifier et Créer le Compte",
            resendCode: "Renvoyer le Code",
            invalidCode: "Code invalide. Veuillez réessayer.",
            demoCodeMessage: "Pour la démonstration, votre code est : {code}",
        },
    },
    pt: {
        header: {
            navLinks: ["Produtos", "Soluções", "Empresas", "Recursos", "Companhia"],
            signIn: "Entrar",
            tryForFree: "Experimente Grátis",
        },
        sidebar: {
            home: "Início",
            title: "Criação de IA",
            video: "Vídeo",
            image: "Imagem",
            assets: "Ativos",
            gallery: "Galeria",
            admin: "Admin",
        },
        hero: {
            titleStart: "Transformar",
            titleGradient: "Ideia para Visual",
            placeholder: "Digite sua ideia e clique em \"Criar\" para obter um vídeo",
            buttonText: "Criar vídeo",
            buttonLoadingText: "Gerando",
            buttonTextAuthRequired: "Criar vídeo",
            imageUploadTooltip: "Adicionar imagem"
        },
        imageGenerator: {
            title: "Dê Vida à Sua Imaginação",
            subtitle: "Descreva qualquer imagem que você possa imaginar, e nossa IA a criará para você em segundos.",
            placeholder: "Ex: Um astronauta andando a cavalo em Marte, fotorrealista",
            buttonText: "Gerar Imagens",
            buttonLoadingText: "Criando {count}...",
            loadingMessage: "Criando suas {count} imagem(ns)...",
            settingsTitle: "Configurações de Imagem",
            aspectRatio: "Proporção",
            aspectRatioOptions: {
                '1:1': 'Quadrado (1:1)',
                '16:9': 'Widescreen (16:9)',
                '9:16': 'Retrato (9:16)',
                '4:3': 'Paisagem (4:3)',
                '3:4': 'Vertical (3:4)',
            },
            numberOfImages: "Número de Imagens",
            buttonTextAuthRequired: "Faça Login para Gerar",
        },
        imageCreation: {
            pageTitle: "Geração de Imagem",
            placeholder: "Insira descrições naturais e coerentes para liberar o poder da geração de imagens.",
            characterCount: "{count}/1250",
            referenceCharacter: "Adicionar caractere de referência",
            model: "Imagem-01",
            quantity: "Quantidade",
            favorites: "Favoritos",
            creationType: "Tipo : Todas as criações",
            subscribeBanner: "Inscreva-se para aproveitar o acesso rápido",
            subscribeButton: "Inscrever-se",
            noGenerations: "Gerações aparecerão aqui",
            viewGuide: "Ver guia",
        },
        gallery: {
            title: "Explore o que é Possível",
            subtitle: "Veja o que outros criaram com o Studio IA. O único limite é a sua imaginação.",
            filters: {
                all: "Todos",
                videos: "Vídeos",
                images: "Imagens"
            }
        },
        videoResult: {
            title: "Seu Vídeo Gerado",
            downloadButton: "Baixar Vídeo",
            narrationButtonPlay: "Tocar Narração",
            narrationButtonStop: "Parar Narração",
        },
        videoPreviewModal: {
            title: "Vídeo Pronto",
            promptLabel: "Prompt:",
            saveButton: "Salvar nos Ativos",
            downloadButton: "Baixar",
        },
        imageResult: {
            title: "Suas Imagens Geradas",
            downloadButton: "Baixar",
        },
        assetsView: {
            title: "Meus Ativos",
            subtitle: "Todos os seus vídeos e imagens gerados em um só lugar.",
            noAssetsTitle: "Nenhum Ativo Ainda",
            noAssetsMessage: "Comece a criar vídeos ou imagens para vê-los aqui.",
            deleteButton: "Excluir Ativo",
            downloadButton: "Baixar Ativo",
        },
        adminView: {
            title: "Gerenciamento de Usuários",
            subtitle: "Visualize e gerencie todos os usuários cadastrados.",
            totalUsers: "Total de Usuários",
            table: {
                email: "E-mail",
                registeredAt: "Data de Cadastro",
            },
            noUsers: "Nenhum usuário se cadastrou ainda.",
        },
        error: {
            title: "Erro",
            prefix: "Falha ao gerar o vídeo.",
            imagePrefix: "Falha ao gerar as imagens."
        },
        footer: {
            copyright: "© {year} Studio IA. Todos os direitos reservados.",
            links: ["Termos", "Privacidade", "Contato"],
        },
        auth: {
            login: "Login",
            signUp: "Cadastre-se",
            modalTitleLogin: "Bem-vindo de volta",
            modalTitleSignUp: "Crie sua conta",
            emailLabel: "E-mail",
            passwordLabel: "Senha",
            confirmPasswordLabel: "Confirmar Senha",
            loginButton: "Login",
            signUpButton: "Criar Conta",
            switchToSignUp: "Não tem uma conta? Cadastre-se",
            switchToLogin: "Já tem uma conta? Faça Login",
            logout: "Sair",
            welcome: "Bem-vindo",
            orDivider: "OU",
            continueWithGoogle: "Entrar com Google",
            continueWithGithub: "Entrar com GitHub",
            modalTitleVerify: "Verifique seu e-mail",
            verifyInstructions: "Enviamos um código de 6 dígitos para {email}. Por favor, insira-o abaixo.",
            verificationCodeLabel: "Código de Verificação",
            verifyButton: "Verificar e Criar Conta",
            resendCode: "Reenviar Código",
            invalidCode: "Código inválido. Tente novamente.",
            demoCodeMessage: "Para demonstração, seu código é: {code}",
        },
    }
};