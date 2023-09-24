export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const albumsStatic = [
    {
        name: 'Alb1'
    },
    {
        name: 'alb2'
    },
    {
        name: 'alb3'
    },
    {
        name: 'alb4'
    },
    {
        name: 'alb5'
    },
    {
        name: 'alb6'
    },
    {
        name: 'alb7'
    },
]