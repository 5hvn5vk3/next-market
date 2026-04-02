CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  title TEXT,
  price TEXT,
  image TEXT,
  description TEXT,
  email TEXT
);

INSERT INTO items (title, price, image, description, email)
  VALUES('色えんぴつ', '1500', '/img2.jpg', '使いやすい色えんぴつです', 'user@example.com');

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
  CONSTRAINT users_name_unique UNIQUE (name)
  CONSTRAINT users_email_unique UNIQUE (email)
);