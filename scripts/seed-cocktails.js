import { neon } from '@neondatabase/serverless';

const connectionString = 'postgresql://neondb_owner:npg_ricZv1D8LunW@ep-long-queen-ac782ny2.sa-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(connectionString);

const cocktails = [
  { name: 'Fernet Branca con Coca', ingredients: ['40% Fernet Branca', '60% Coca Cola', 'Hielo abundante'], description: 'El preferido absoluto. ¡Este trago es como pegarle a la lotería! Amargo, refrescante y legendario.' },
  { name: 'Piña Colada', ingredients: ['Ron Blanco', 'Crema de Coco', 'Jugo de Piña'], description: 'El clásico caribeño por excelencia.' },
  { name: 'Mojito', ingredients: ['Ron Blanco', 'Hierbabuena', 'Azúcar', 'Lima', 'Soda'], description: 'Fresco, mentolado y revitalizante.' },
  { name: 'Daiquiri de Fresa', ingredients: ['Ron Blanco', 'Fresas', 'Jugo de Lima', 'Almíbar'], description: 'Dulce y helado para tardes calurosas.' },
  { name: 'Bahama Mama', ingredients: ['Ron de Coco', 'Ron Negro', 'Jugo de Naranja', 'Jugo de Piña', 'Granadina'], description: 'Explosión de frutas tropicales.' },
  { name: 'Mai Tai', ingredients: ['Ron Blanco', 'Ron Negro', 'Curacao de Naranja', 'Orgeat', 'Jugo de Lima'], description: 'Sabor complejo y auténtico estilo Tiki.' },
  { name: 'Margarita', ingredients: ['Tequila', 'Triple Sec', 'Jugo de Lima'], description: 'Fuerte, cítrico y clásico.' },
  { name: 'Tequila Sunrise', ingredients: ['Tequila', 'Jugo de Naranja', 'Granadina'], description: 'Vibrante y dulce como un amanecer tropical.' },
  { name: 'Sex on the Beach', ingredients: ['Vodka', 'Licor de Durazno', 'Jugo de Arándano', 'Jugo de Naranja'], description: 'Afrutado, dulce y veraniego.' },
  { name: 'Cosmopolitan', ingredients: ['Vodka Citrón', 'Cointreau', 'Jugo de Arándano', 'Jugo de Lima'], description: 'Elegante y sofisticado.' },
  { name: 'Martini Clásico', ingredients: ['Ginebra', 'Vermut Seco', 'Aceituna'], description: 'El rey de los cócteles refinados.' },
  { name: 'Old Fashioned', ingredients: ['Bourbon', 'Angostura', 'Azúcar', 'Piel de Naranja'], description: 'Robusto, aromático y tradicional.' },
  { name: 'Manhattan', ingredients: ['Whisky de Centeno', 'Vermut Dulce', 'Angostura'], description: 'Un clásico urbano atemporal.' },
  { name: 'Whiskey Sour', ingredients: ['Bourbon', 'Jugo de Limón', 'Almíbar', 'Clara de Huevo'], description: 'Equilibrio perfecto entre ácido y dulce.' },
  { name: 'Negroni', ingredients: ['Ginebra', 'Campari', 'Vermut Rojo'], description: 'El balance perfecto del amargor italiano.' },
  { name: 'Tom Collins', ingredients: ['Ginebra', 'Jugo de Limón', 'Almíbar', 'Soda'], description: 'Refrescante, ligero y burbujeante.' },
  { name: 'Moscow Mule', ingredients: ['Vodka', 'Cerveza de Jengibre', 'Jugo de Lima'], description: 'Servido helado en taza de cobre.' },
  { name: 'Gin Tonic Tropical', ingredients: ['Ginebra', 'Agua Tónica', 'Rodaja de Pomelo', 'Maracuyá'], description: 'Un twist caribeño para el clásico.' },
  { name: 'Bloody Mary', ingredients: ['Vodka', 'Jugo de Tomate', 'Salsa Inglesa', 'Tabasco', 'Limón'], description: 'Complejo, salado y picante.' },
  { name: 'Espresso Martini', ingredients: ['Vodka', 'Licor de Café', 'Café Espresso'], description: 'Para despertar la noche.' },
  { name: 'Caipirinha', ingredients: ['Cachaça', 'Lima en trozos', 'Azúcar'], description: 'El alma de Brasil en un vaso.' },
  { name: 'Cuba Libre', ingredients: ['Ron Dorado', 'Coca Cola', 'Rodaja de Lima'], description: 'Un clásico caribeño directo y delicioso.' },
  { name: 'Blue Hawaiian', ingredients: ['Ron Blanco', 'Blue Curaçao', 'Crema de Coco', 'Jugo de Piña'], description: 'Color azul océano y sabor a paraíso.' },
  { name: 'Long Island Iced Tea', ingredients: ['Vodka', 'Tequila', 'Ron', 'Ginebra', 'Triple Sec', 'Limón', 'Coca Cola'], description: 'Potente, refrescante y multifacético.' },
  { name: 'Paloma', ingredients: ['Tequila', 'Refresco de Toronja', 'Sal en el borde', 'Lima'], description: 'La bebida favorita de México.' },
  { name: 'Dark and Stormy', ingredients: ['Ron Negro', 'Cerveza de Jengibre', 'Lima'], description: 'Intenso, especiado y tormentoso.' },
  { name: 'Singapore Sling', ingredients: ['Ginebra', 'Cherry Brandy', 'Cointreau', 'Benedictine', 'Piña', 'Granadina'], description: 'Exótico y con un legado histórico.' },
  { name: 'White Russian', ingredients: ['Vodka', 'Licor de Café', 'Crema de Leche'], description: 'Cremoso y reconfortante.' },
  { name: 'Black Russian', ingredients: ['Vodka', 'Licor de Café'], description: 'Directo y oscuro.' },
  { name: 'Amaretto Sour', ingredients: ['Licor de Amaretto', 'Jugo de Limón', 'Clara de Huevo'], description: 'Dulce sabor a almendra con toque ácido.' },
  { name: 'Pisco Sour', ingredients: ['Pisco', 'Jugo de Limón', 'Jarabe de Goma', 'Clara de Huevo'], description: 'Espumoso y emblemático de Sudamérica.' },
  { name: 'Bellini', ingredients: ['Prosecco', 'Puré de Durazno'], description: 'Burbujeante y delicado.' },
  { name: 'Mimosa', ingredients: ['Champagne', 'Jugo de Naranja'], description: 'El rey del brunch.' },
  { name: 'Aperol Spritz', ingredients: ['Aperol', 'Prosecco', 'Soda', 'Rodaja de Naranja'], description: 'El atardecer en un trago.' },
  { name: 'Irish Coffee', ingredients: ['Whiskey Irlandés', 'Café Caliente', 'Azúcar Negra', 'Crema batida'], description: 'Reconfortante y con cuerpo.' },
  { name: 'French 75', ingredients: ['Ginebra', 'Champagne', 'Jugo de Limón', 'Almíbar'], description: 'Sofisticado y chispeante.' },
  { name: 'Sidecar', ingredients: ['Cognac', 'Cointreau', 'Jugo de Limón'], description: 'Un clásico de los años 20.' },
  { name: 'Boulevardier', ingredients: ['Bourbon', 'Campari', 'Vermut Dulce'], description: 'El primo rico del Negroni.' },
  { name: 'Sazerac', ingredients: ['Cognac / Rye Whiskey', 'Absenta', 'Peychaud bitters', 'Azúcar'], description: 'Directamente desde New Orleans.' },
  { name: 'Vesper Martini', ingredients: ['Ginebra', 'Vodka', 'Lillet Blanc'], description: 'Al estilo de James Bond: agitado, no revuelto.' },
  { name: 'Lemon Drop Martini', ingredients: ['Vodka Citrón', 'Triple Sec', 'Jugo de Limón', 'Azúcar'], description: 'Dulce y ácido como un caramelo.' },
  { name: 'Zombie', ingredients: ['Ron Blanco', 'Ron Dorado', 'Ron Overproof', 'Falernum', 'Fruta de la Pasión', 'Granadina'], description: '¡Cuidado! Potencia Tiki extrema.' },
  { name: 'Hurricane', ingredients: ['Ron Blanco', 'Ron Negro', 'Jugo de Maracuyá', 'Jugo de Naranja', 'Lima'], description: 'Un torbellino de sabor dulce.' },
  { name: 'Planter Punch', ingredients: ['Ron Negro', 'Jugo de Naranja', 'Jugo de Piña', 'Limón', 'Granadina'], description: 'El ponche de los navegantes.' },
  { name: 'Bramble', ingredients: ['Ginebra', 'Jugo de Limón', 'Almíbar', 'Licor de Mora'], description: 'Aromático y con un hermoso degradado.' },
  { name: 'Clover Club', ingredients: ['Ginebra', 'Frambuesas', 'Jugo de Limón', 'Clara de Huevo'], description: 'Elegancia aterciopelada de color rosa.' },
  { name: 'Aviation', ingredients: ['Ginebra', 'Licor de Marrasquino', 'Crema de Violeta', 'Limón'], description: 'Un viaje al cielo de color violeta.' },
  { name: 'Corpse Reviver No. 2', ingredients: ['Ginebra', 'Cointreau', 'Lillet Blanc', 'Limón', 'Absenta'], description: 'Diseñado para revivir a los muertos.' },
  { name: 'Gimlet', ingredients: ['Ginebra', 'Cordial de Lima'], description: 'Sencillo, directo y refrescante.' },
  { name: 'Hanky Panky', ingredients: ['Ginebra', 'Vermut Dulce', 'Fernet Branca'], description: 'Un toque herbal y sofisticado.' },
  { name: 'Last Word', ingredients: ['Ginebra', 'Green Chartreuse', 'Licor de Marrasquino', 'Jugo de Lima'], description: 'Complejo, herbal y perfectamente balanceado.' }
];

async function seed() {
  console.log('Iniciando carga de 51 cócteles en Neon DB...');
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cocktails (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE,
        ingredients TEXT[],
        description TEXT
      )
    `;

    for (const c of cocktails) {
      await sql`
        INSERT INTO cocktails (name, ingredients, description) 
        VALUES (${c.name}, ${c.ingredients}, ${c.description})
        ON CONFLICT (name) DO UPDATE 
        SET ingredients = EXCLUDED.ingredients, description = EXCLUDED.description
      `;
      console.log(`- Insertado/Actualizado: ${c.name}`);
    }
    console.log('¡Carga completada con éxito!');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
}

seed();
