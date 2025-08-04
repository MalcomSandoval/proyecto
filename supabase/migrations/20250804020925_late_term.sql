/*
  # Esquema de Tareas - Sistema de Gestión de Tareas

  ## Resumen
  Este archivo crea el esquema completo para la aplicación de gestión de tareas, incluyendo tablas para categorías y tareas con todas las funcionalidades requeridas.

  ## 1. Nuevas Tablas
  ### `categories`
  - `id` (uuid, clave primaria)
  - `name` (texto, nombre de la categoría)
  - `color` (texto, color hexadecimal para la UI)
  - `user_id` (uuid, referencia al usuario autenticado)
  - `created_at` (timestamp con zona horaria)

  ### `tasks`
  - `id` (uuid, clave primaria)
  - `title` (texto, título de la tarea)
  - `description` (texto opcional, descripción detallada)
  - `completed` (boolean, estado de completado)
  - `category_id` (uuid opcional, referencia a categoría)
  - `user_id` (uuid, referencia al usuario autenticado)
  - `due_date` (date opcional, fecha límite)
  - `created_at` (timestamp con zona horaria)
  - `updated_at` (timestamp con zona horaria)

  ## 2. Seguridad
  - Habilita RLS (Row Level Security) en ambas tablas
  - Las políticas aseguran que los usuarios solo puedan acceder a sus propios datos
  - Políticas separadas para operaciones SELECT, INSERT, UPDATE y DELETE

  ## 3. Funcionalidades
  - Sistema de categorías con colores personalizables
  - Tareas con estados de completado
  - Fechas límite opcionales
  - Descripciones detalladas opcionales
  - Timestamps automáticos para auditoría
*/

-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL DEFAULT '#3B82F6',
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de tareas
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  completed boolean DEFAULT false,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Políticas para categories
CREATE POLICY "Users can read own categories"
  ON categories
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas para tasks
CREATE POLICY "Users can read own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS categories_user_id_idx ON categories(user_id);
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_category_id_idx ON tasks(category_id);
CREATE INDEX IF NOT EXISTS tasks_completed_idx ON tasks(completed);
CREATE INDEX IF NOT EXISTS tasks_due_date_idx ON tasks(due_date);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en tasks
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();