USE Universo_Fantasía;
INSERT INTO DRAGON (nombre, raza, color, tamaño, aliento, edad, habilidad_especial, debilidad, nombre_cueva, ubicacion_cueva, descripcion_cueva) 
VALUES 
-- Dragón 1: Smaug
('Smaug', 'Occidental', 'Rojo', 'Colosal', 'Fuego', 'Anciano', 
 'Visión de calor, Vuelo supersónico', 'Punto débil en el pecho', 'Erebor', 'Montaña Solitaria', 'Gran cámara de oro y tesoros'),

-- Dragón 2: Saphira
('Saphira', 'Oriental', 'Azul', 'Grande', 'Electricidad', 'Adulto', 'Telepatía', 'Vínculo empático con jinete', 'Pico del Nido', 'Volcán inactivo', 'Nido seguro en la cima'),

-- Dragón 3: Drogon
('Drogon', 'Nórdico', 'Blanco', 'Grande', 'Hielo', 'Joven', 'Control del clima (tormentas)', 'Fuego valyrio', 'Cima de la Tormenta', 'Pico nevado', 'Cueva helada, difícil acceso'),

-- Dragón 4: Strix
('Strix', 'Occidental', 'Negro', 'Mediano', 'Veneno', 'Joven', 'Piel de escamas impenetrable', 'Es nocturno y débil a la luz del día', 'Foso de Wyrms', 'Mazmorra subterránea', 'Templo antiguo en ruinas');

INSERT INTO MAGA (nombre, especialidad, escuela_magia, varita_magica, lealtad, maestria)
VALUES 
-- Maga 1
('Minerva', 'Transformación', 'Hogwarts', 'Roble, núcleo de pluma de Fénix, 10"', 'Orden de los magos', 'Archimaga'),

-- Maga 2
('Sabrina', 'Adivinación', 'Ilvermorny', 'Sauce, pelo de Unicornio, 12"', 'Orden de los magos', 'Maestro'),

-- Maga 3
('Aggie', 'Sanación', 'Beauxbatons', 'Pino, lágrima de sirena, 11"', 'Independiente', 'Maestro'),

-- Maga 4
('Lilith', 'Necromancia', 'Academia de Artes Ocultas', 'Madera de Fresno, sin núcleo conocido, 14"', 'Sociedad secreta', 'Archimaga');

INSERT INTO CRIATURAS_MITICAS (id_criaturas_miticas, nombre, tipo, habilidad_especial, id_lugar_fk, tamaño, dieta)
VALUES
-- Criatura 1
(1, 'Unicornio', 'Mamífero', 'Curación', 2, 'Mediano', 'Herbívoro'), -- Lugar 2 (Bosque Prohibido)

-- Criatura 2
(2, 'Fénix', 'Ave', 'Regeneración', 4, 'Pequeño', 'Omnívoro'),      -- Lugar 4 (Ciudad Élifica)

-- Criatura 3
(3, 'Grifo', 'Híbrido', 'Vuelo a gran velocidad', 1, 'Grande', 'Carnívoro'), -- Lugar 1 (Gondor)

-- Criatura 4
(4, 'Basilisco', 'Reptil', 'Petrificación', 2, 'Colosal', 'Carnívoro'); -- Lugar 2 (Bosque Prohibido)

INSERT INTO POCION (id_pocion, nombre, ingredientes, efecto, duracion, efectos_secundarios, id_maga_creadora_fk)
VALUES 
-- Poción 1
(1, 'Poción de la vida', 'Raíz de mandrágora, cuerno de unicornio', 
 'Curación rápida', 'Temporal', 'Somnolencia', 3), -- Creada por Aggie (ID 3)

-- Poción 2
(2, 'Poción del olvido', 'Agua del Lete, valeriana', 
 'Pérdida de memoria', 'Permanente', 'Náuseas', 2), -- Creada por Sabrina (ID 2)

-- Poción 3
(3, 'Poción de la Verdad', 'Hojas de muérdago, pelo de thestral', 
 'Obliga a decir la verdad', 'Temporal', 'Dolor de cabeza', 1), -- Creada por Minerva (ID 1)

-- Poción 4
(4, 'Elixir de Fuerza', 'Sangre de dragón, piedra solar', 
 'Aumento de fuerza', 'Temporal', 'Adicción', 4); -- Creada por Lilith (ID 4)
 
 INSERT INTO HECHIZO (id_hechizo, nombre, tipo, dificultad, alcance, componentes, id_maga_fk)
VALUES 
-- Hechizo 1: Lumos
(1, 'Lumos', 'Encantamiento', 'Fácil', 'Corto', 
 'Verbal, Movimiento o varita', 1), -- Creado por Minerva (ID 1)

-- Hechizo 2: Reparo
(2, 'Reparo', 'Utilitario', 'Fácil', 'Medio', 
 'No verbal, Movimiento o varita', 2), -- Creado por Sabrina (ID 2)

-- Hechizo 3: Expelliarmus
(3, 'Expelliarmus', 'Defensivo', 'Medio', 'Corto', 
 'Verbal, Movimiento o varita', 3), -- Creado por Aggie (ID 3)

-- Hechizo 4: Imperio
(4, 'Imperio', 'Maldición', 'Experto', 'Corto', 
 'Verbal', 4); -- Creado por Lilith (ID 4)
 
 INSERT INTO LUGAR (id_lugar, nombre, descripcion, tipo, ubicacion_mapa, historia, habitantes, recursos)
VALUES 
-- Lugar 1
(1, 'Gondor', 'Gran ciudad fortificada, corazón del reino de los hombres.', 'Ciudad/Reino', 'Valle del Anduin', 
 'Escenario de grandes batallas.', 'Hombres, Elfos', 'Minerales, Agua'),

-- Lugar 2
(2, 'Bosque Prohibido', 'Bosque denso y oscuro, lleno de criaturas peligrosas', 'Bosque', 'Cerca de Hogwarts', 
 'Lugar de iniciación mágica y misterios.', 'Acromántulas, Centauros', 'Plantas mágicas'),

-- Lugar 3
(3, 'Monte del Destino', 'Volcán activo y peligroso.', 'Volcán', 'Mordor', 
 'Aquí se forjó el Anillo Único.', 'Orcos, Dragones de Fuego', 'Fuego, Minerales'),

-- Lugar 4
(4, 'Ciudad Élfica de Eldoria', 'Ciudad construida en las copas de los árboles, oculta.', 'Ciudad/Bosque', 'Bosque de Plata', 
 'Refugio ancestral de los elfos.', 'Elfos, Faunos', 'Maderas mágicas, Agua');
 
 -- Verificar todos los Dragones
SELECT * FROM DRAGON;

-- Verificar todas las Magas
SELECT * FROM MAGA;

-- Verificar todos los Lugares
SELECT * FROM LUGAR;

-- Verificar todas las Criaturas Míticas
SELECT * FROM CRIATURAS_MITICAS;

-- Verificar todas las Pociones
SELECT * FROM POCION;

-- Verificar todos los Hechizos
SELECT * FROM HECHIZO;

 