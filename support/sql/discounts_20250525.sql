INSERT INTO public.discounts (
	discount_type, discount_id, created_at, is_deleted, updated_at, 
	end_date, "name", start_date, 
	pricing_type, status_type, channel_type, 
	seller_id)
VALUES (
	'PRODUCT', '9cc47a08-1868-4bed-9238-6cf350b564ef', NOW(), false, NOW(), 
	NOW() + interval '1 year', 'Product discount ' || TO_CHAR(NOW(), 'YYYY-MM-DD HH12:MI:SS AM'), NOW(), 
	'PERCENTAGE_OFF', 'ONGOING', null, 
	'76032358-48c1-43f0-a5af-68bd80974025'
);