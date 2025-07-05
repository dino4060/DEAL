ALTER TABLE deal.public.products						
ADD COLUMN text_search_vector tsvector GENERATED ALWAYS AS (						
to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))						
) STORED;						

CREATE INDEX products_tsearch ON deal.public.products USING GIN(text_search_vector);

WITH query AS (
SELECT plainto_tsquery('english', 'áo COOLMATE chạy bộ') AS q
)
SELECT p.*,
ts_rank(p.text_search_vector, query.q) AS rank
FROM deal.public.products p, query
WHERE p.text_search_vector @@ query.q
ORDER BY rank DESC;