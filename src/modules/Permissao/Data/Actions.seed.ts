import { Actions } from "../Entities/Actions";
import { createConnection } from "typeorm";
import Routes from "../../../routes";

export default (function () {
  let actionsData = [];
  createConnection().then((connec) => {
    Routes.forEach((route) => {
      route.action_key &&
        actionsData.push({
          action: route.action_key,
        });
    });

    const actionsControllerRepository = connec.getRepository(Actions);
	
    actionsData.forEach(async (data) => {
      await actionsControllerRepository.save(data);
    });
  });
  return true;
})();
