import { GenericService } from "@services/generic-service";
import { Hono } from "hono";
import { ApplicationVariables } from "index";

export const genericController = new Hono<{ Bindings: ApplicationVariables }>();

genericController.get('/generic/layanan', async (c) => {

  const data: any = await GenericService.getLayanan();
  
  return c.json({ data: data })
});