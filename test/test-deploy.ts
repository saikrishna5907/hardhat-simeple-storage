import { SimpleStorage } from './../typechain-types/SimpleStorage';
import { SimpleStorage__factory } from './../typechain-types/factories/SimpleStorage__factory';
import { ethers } from 'hardhat';
import { expect } from 'chai';
describe('SimpleStorage', () => {
    let simpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage") as SimpleStorage__factory;
        simpleStorage = await simpleStorageFactory.deploy();
    })

    it('should start with a favorite number of 0', async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0";

        expect(currentValue.toString()).equal(expectedValue)
    })

    it('should update when we call update', async () => {
        const expectedValue = "7"

        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve()

        expect(currentValue.toString()).equal(expectedValue)
    })
})